/**
 * EngineBridge.ts
 * Bu dosya, ana sayfa ile iframe içindeki oyun arasındaki güvenli iletişimi sağlar.
 * Oyunun High Score'u veya durumunu ana sayfaya göndermesi için bir köprü görevi görür.
 */

export interface GameEvent {
    type: 'SCORE_UPDATE' | 'GAME_OVER' | 'GAME_READY' | 'LEVEL_UP';
    value: any;
    timestamp: number;
}

export class EngineBridge {
    private gameId: string;
    private targetOrigin: string;

    constructor(gameId: string, targetOrigin: string = '*') {
        self.gameId = gameId;
        self.targetOrigin = targetOrigin;
        self.initListeners();
    }

    /**
     * Mesaj dinleyicilerini başlat
     */
    private initListeners() {
        window.addEventListener('message', (event) => {
            // Güvenlik kontrolü (üretim aşamasında targetOrigin kontrol edilmeli)
            if (this.targetOrigin !== '*' && event.origin !== this.targetOrigin) return;

            const data = event.data;
            if (data && data.source === 'ARCADE_ENGINE_GAME') {
                this.handleGameMessage(data.payload as GameEvent);
            }
        });
    }

    /**
     * Oyundan gelen verileri işle
     */
    private handleGameMessage(event: GameEvent) {
        console.log(`[Arcade Engine] Received from ${this.gameId}:`, event);
        
        switch (event.type) {
            case 'SCORE_UPDATE':
                this.updateLocalHighScore(event.value);
                break;
            case 'GAME_OVER':
                this.showGameOverHUD(event.value);
                break;
            default:
                break;
        }
    }

    /**
     * Skor tablosu güncelleme mantığı
     */
    private updateLocalHighScore(score: number) {
        // Firebase veya LocalStorage entegrasyonu buraya gelecek
        console.log(`Updating high score for ${this.gameId} to: ${score}`);
    }

    /**
     * HUD Tetikleme
     */
    private showGameOverHUD(finalData: any) {
        // UI katmanını tetikler
        const customEvent = new CustomEvent('arcade:game-over', { detail: finalData });
        window.dispatchEvent(customEvent);
    }
}
