/**
 * SoundManager.ts
 * Manages game sound effects and background music.
 */

export class SoundManager {
    private sounds: Map<string, HTMLAudioElement> = new Map();
    private isMuted: boolean = false;

    constructor() {
        console.log("[Arcade Sound] Initialized");
    }

    public loadSound(name: string, url: string) {
        const audio = new Audio(url);
        this.sounds.set(name, audio);
    }

    public play(name: string) {
        if (this.isMuted) return;
        const audio = this.sounds.get(name);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.warn(`[Arcade Sound] Playback failed for ${name}:`, e));
        }
    }

    public toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }
}
