class SoundManager {
  private static instance: SoundManager;
  private sounds: Map<string, HTMLAudioElement>;
  private isMuted: boolean;

  private constructor() {
    this.sounds = new Map();
    this.isMuted = false;
    this.loadSounds();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private loadSounds() {
    // Battle sounds
    this.preloadSound('attack', '/sounds/attack.mp3');
    this.preloadSound('hit', '/sounds/hit.mp3');
    this.preloadSound('victory', '/sounds/victory.mp3');
    this.preloadSound('defeat', '/sounds/defeat.mp3');
    
    // UI sounds
    this.preloadSound('button', '/sounds/button-click.mp3');
    this.preloadSound('unlock', '/sounds/unlock.mp3');
    this.preloadSound('level-up', '/sounds/level-up.mp3');
  }

  private preloadSound(id: string, url: string) {
    const audio = new Audio(url);
    audio.load();
    this.sounds.set(id, audio);
  }

  public play(soundId: string) {
    if (this.isMuted) return;
    
    const sound = this.sounds.get(soundId);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(error => console.warn('Audio playback failed:', error));
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }
}

export default SoundManager; 