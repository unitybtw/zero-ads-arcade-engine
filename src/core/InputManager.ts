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
    }

    public getConnectedGamepads() {
        return Array.from(this.gamepads.values());
    }
}
