/**
 * SoundManager.ts
 * Manages game sound effects and background music.
 */

export class SoundManager {
    private sounds: Map<string, HTMLAudioElement> = new Map();
    private isMuted: boolean = false;
    private globalVolume: number = 1.0;

    constructor() {
        console.log("[Arcade Sound] Initialized");
    }

    public setGlobalVolume(volume: number) {
        this.globalVolume = Math.max(0, Math.min(1, volume));
        this.sounds.forEach(audio => {
            audio.volume = this.globalVolume;
        });
        console.log(`[Arcade Sound] Global volume set to: ${this.globalVolume}`);
    }

    public loadSound(name: string, url: string) {
        const audio = new Audio(url);
        audio.volume = this.globalVolume;
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
