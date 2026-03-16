/**
 * HUDController.ts
 * Mobil cihazlar için fütüristik oyun kontrolleri oluşturur.
 */

export class HUDController {
    private container: HTMLElement;

    constructor(containerId: string) {
        const el = document.getElementById(containerId);
        if (!el) throw new Error("HUD Container not found");
        this.container = el;
        this.renderHUD();
    }

    private renderHUD() {
        this.container.innerHTML = `
            <style>
                .arcade-hud-overlay {
                    position: absolute;
                    bottom: 20px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 30px;
                    pointer-events: none;
                }
                .hud-btn {
                    width: 70px;
                    height: 70px;
                    background: rgba(0, 229, 255, 0.1);
                    border: 2px solid #00e5ff;
                    border-radius: 50%;
                    backdrop-filter: blur(5px);
                    color: #00e5ff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: auto;
                    user-select: none;
                    box-shadow: 0 0 15px rgba(0, 229, 255, 0.3);
                    transition: all 0.1s ease;
                }
                .hud-btn.small {
                    width: 40px;
                    height: 40px;
                    font-size: 12px;
                }
                .hud-top-right {
                    position: absolute;
                    top: -450px;
                    right: 30px;
                    pointer-events: auto;
                }
                .hud-btn:active {
                    transform: scale(0.9);
                    background: rgba(0, 229, 255, 0.3);
                }
            </style>
            <div class="arcade-hud-overlay">
                <div class="hud-top-right">
                    <button class="hud-btn small" id="btn-pause">II</button>
                </div>
                <div class="hud-dpad">
                    <button class="hud-btn" id="btn-left">←</button>
                    <button class="hud-btn" id="btn-right">→</button>
                </div>
                <div class="hud-actions">
                    <button class="hud-btn" id="btn-a">A</button>
                    <button class="hud-btn" id="btn-b">B</button>
                </div>
            </div>
        `;
        this.bindTouchEvents();
    }

    private bindTouchEvents() {
        const buttons = ['left', 'right', 'a', 'b', 'pause'];
        let isPaused = false;

        buttons.forEach(btnId => {
            const btn = document.getElementById(`btn-${btnId}`);
            if (btn) {
                if (btnId === 'pause') {
                    btn.addEventListener('click', () => {
                        isPaused = !isPaused;
                        btn.innerText = isPaused ? '▶' : 'II';
                        this.emitEvent(isPaused ? 'PAUSE' : 'RESUME');
                    });
                } else {
                    btn.addEventListener('touchstart', () => this.emitInput(btnId, true));
                    btn.addEventListener('touchend', () => this.emitInput(btnId, false));
                }
            }
        });
    }

    private emitEvent(type: string) {
        window.dispatchEvent(new CustomEvent('arcade:engine-event', { detail: { type } }));
    }

    private emitInput(key: string, isPressed: boolean) {
        console.log(`Input ${key}: ${isPressed ? 'Pressed' : 'Released'}`);
        // Ana oyun köprüsüne mesaj gönder
    }
}
