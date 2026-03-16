/**
 * EngineBridge.ts
 * Bu dosya, ana sayfa ile iframe içindeki oyun arasındaki güvenli iletişimi sağlar.
 * Oyunun High Score'u veya durumunu ana sayfaya göndermesi için bir köprü görevi görür.
 */

import { SoundManager } from './SoundManager.js';

export type GameEventType = 'SCORE_UPDATE' | 'GAME_OVER' | 'GAME_READY' | 'LEVEL_UP' | 'PAUSE' | 'RESUME' | 'GAME_ERROR';

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
    private iframe: HTMLIFrameElement | null = null;

    constructor(gameId: string, iframeId?: string, targetOrigin: string = '*') {
        this.gameId = gameId;
        this.targetOrigin = targetOrigin;
        this.sound = new SoundManager();
        
        if (iframeId) {
            this.iframe = document.getElementById(iframeId) as HTMLIFrameElement;
            this.initErrorBoundary();
        }

        this.initListeners();
    }

    private initErrorBoundary() {
        if (!this.iframe) return;

        this.iframe.onerror = (e) => {
            console.error(`[Arcade Engine] Iframe error detected for ${this.gameId}:`, e);
            this.emitLocalEvent('GAME_ERROR', { message: 'Iframe failed to load' });
        };

        // Check for empty src or blocked content
        setTimeout(() => {
            if (this.iframe && (!this.iframe.src || this.iframe.src === 'about:blank')) {
                this.emitLocalEvent('GAME_ERROR', { message: 'Iframe source is invalid' });
            }
        }, 2000);
    }

    private emitLocalEvent(type: GameEventType | 'GAME_ERROR', value: any) {
        const handlers = this.handlers.get(type as GameEventType);
        if (handlers) {
            handlers.forEach(h => h(value));
        }
    }

    public on(type: GameEventType, handler: (data: any) => void) {
        if (!this.handlers.has(type)) {
            this.handlers.set(type, []);
        }
        this.handlers.get(type)?.push(handler);
    }

    private initListeners() {
        window.addEventListener('message', (event) => {
            // Security check: Only process messages from the allowed origin
            if (this.targetOrigin !== '*' && event.origin !== this.targetOrigin) {
                console.warn(`[Arcade Engine] Blocking message from unauthorized origin: ${event.origin}`);
                return;
            }

            const data = event.data;
            if (data && data.source === 'ARCADE_ENGINE_GAME') {
                this.handleGameMessage(data.payload as GameEvent, event.origin);
            }
        });
    }

    private handleGameMessage(event: GameEvent, senderOrigin: string) {
        // Double check origin if not wildcard
        if (this.targetOrigin !== '*' && senderOrigin !== this.targetOrigin) return;

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
