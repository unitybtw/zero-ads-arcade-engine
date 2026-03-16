/**
 * InputManager.ts
 * Handlers for Gamepad, Keyboard, and Touch inputs.
 */

export class InputManager {
    private gamepads: Map<number, Gamepad> = new Map();

    constructor() {
        this.initGamepadListeners();
    }

    private initGamepadListeners() {
        window.addEventListener("gamepadconnected", (e) => {
            console.log(`[Arcade Input] Gamepad connected at index ${e.gamepad.index}: ${e.gamepad.id}`);
            this.gamepads.set(e.gamepad.index, e.gamepad);
        });

        window.addEventListener("gamepaddisconnected", (e) => {
            console.log(`[Arcade Input] Gamepad disconnected from index ${e.gamepad.index}`);
            this.gamepads.delete(e.gamepad.index);
        });

        this.startPolling();
    }

    private startPolling() {
        const poll = () => {
            const gps = navigator.getGamepads();
            for (const gp of gps) {
                if (gp) {
                    this.gamepads.set(gp.index, gp);
                    this.handleGamepadInput(gp);
                }
            }
            requestAnimationFrame(poll);
        };
        requestAnimationFrame(poll);
    }

    private handleGamepadInput(gp: Gamepad) {
        // Implementation for mapping buttons/axes comes in next commit
    }

    public getConnectedGamepads() {
        return Array.from(this.gamepads.values());
    }
}
