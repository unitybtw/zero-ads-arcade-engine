/**
 * EngineBridge.ts
 * Bu dosya, ana sayfa ile iframe içindeki oyun arasındaki güvenli iletişimi sağlar.
 * Oyunun High Score'u veya durumunu ana sayfaya göndermesi için bir köprü görevi görür.
 */

import { SoundManager } from './SoundManager';

export type GameEventType = 'SCORE_UPDATE' | 'GAME_OVER' | 'GAME_READY' | 'LEVEL_UP' | 'PAUSE' | 'RESUME';

export interface GameEvent {
    type: GameEventType;
    value: any;
    timestamp: number;
}

export class EngineBridge {
    private gameId: string;
    private targetOrigin: string;
    private handlers: Map<GameEventType, ((data: any) => void)[]> = new Map();
    public sound: SoundManager;

    constructor(gameId: string, targetOrigin: string = '*') {
        this.gameId = gameId;
        this.targetOrigin = targetOrigin;
        this.sound = new SoundManager();
        this.initListeners();
    }

    public on(type: GameEventType, handler: (data: any) => void) {
        if (!this.handlers.has(type)) {
            this.handlers.set(type, []);
        }
        this.handlers.get(type)?.push(handler);
    }

    private initListeners() {
        window.addEventListener('message', (event) => {
            if (this.targetOrigin !== '*' && event.origin !== this.targetOrigin) return;

            const data = event.data;
            if (data && data.source === 'ARCADE_ENGINE_GAME') {
                this.handleGameMessage(data.payload as GameEvent);
            }
        });
    }

    private handleGameMessage(event: GameEvent) {
        console.log(`[Arcade Engine] Event: ${event.type}`, event.value);
        
        const eventHandlers = this.handlers.get(event.type);
        if (eventHandlers) {
            eventHandlers.forEach(handler => handler(event.value));
        }

        // Default handling for critical events
        if (event.type === 'SCORE_UPDATE') {
            this.syncScore(event.value);
        }
    }

    private syncScore(score: number) {
        localStorage.setItem(`arcade_score_${this.gameId}`, score.toString());
    }
}
