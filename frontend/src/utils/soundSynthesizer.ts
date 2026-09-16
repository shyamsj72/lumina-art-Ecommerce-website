// Web Audio API helper for tactile interactive sound demo & audio playback

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTactileClick(pitch = 800, duration = 0.04) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.debug('Audio click ignored:', e);
  }
}

// Interactive demo track generator (lush ambient chords with spatial stereo panning)
class AmbientSoundscape {
  private isPlaying = false;
  private nodes: (AudioNode | OscillatorNode)[] = [];
  private intervalId: number | null = null;
  private onStateChange?: (playing: boolean) => void;

  public setListener(cb: (playing: boolean) => void) {
    this.onStateChange = cb;
  }

  public getStatus() {
    return this.isPlaying;
  }

  public toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  public start() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (this.isPlaying) return;

      this.isPlaying = true;
      if (this.onStateChange) this.onStateChange(true);

      const chords = [
        [220.0, 277.18, 329.63, 440.0], // A maj / F#m7
        [196.0, 246.94, 293.66, 392.0], // G maj7
        [164.81, 220.0, 261.63, 329.63], // E min7
        [174.61, 220.0, 261.63, 349.23], // F maj7
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!this.isPlaying || !ctx) return;
        const freqs = chords[chordIndex % chords.length];
        chordIndex++;

        freqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800 + Math.sin(Date.now()) * 400, ctx.currentTime);

          const panVal = ((i % 3) - 1) * 0.6;
          if (panner) panner.pan.setValueAtTime(panVal, ctx.currentTime);

          const now = ctx.currentTime;
          const duration = 2.8;

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.04, now + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

          osc.connect(filter);
          filter.connect(gain);
          if (panner) {
            gain.connect(panner);
            panner.connect(ctx.destination);
          } else {
            gain.connect(ctx.destination);
          }

          osc.start(now);
          osc.stop(now + duration);
        });
      };

      playChord();
      this.intervalId = window.setInterval(playChord, 2600);
    } catch (e) {
      console.debug('Error playing soundscape:', e);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.onStateChange) this.onStateChange(false);
  }
}

export const soundscape = new AmbientSoundscape();
