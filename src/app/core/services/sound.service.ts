import { Injectable, signal } from '@angular/core';
import { PomodoroMode } from './pomodoro-state.service';

@Injectable({ providedIn: 'root' })
export class SoundService {
    private audioCtx: AudioContext | null = null;
    readonly isMuted = signal(false);

    toggleMute(): void {
        this.isMuted.update(v => !v);
    }

    playTimerEnd(mode: PomodoroMode): void {
        if (this.isMuted()) return;

        const ctx = this.getCtx();
        if (!ctx) return;

        switch (mode) {
            case 'focus':
                this.playFocusEnd(ctx);
                break;
            case 'shortBreak':
                this.playShortBreakEnd(ctx);
                break;
            case 'longBreak':
                this.playLongBreakEnd(ctx);
                break;
        }
    }

    /** Fin de enfoque: acorde ascendente de 3 notas (¡a descansar!) */
    private playFocusEnd(ctx: AudioContext): void {
        const now = ctx.currentTime;
        this.playBeep(ctx, 523, now, 0.18);         // C5
        this.playBeep(ctx, 659, now + 0.2, 0.18);   // E5
        this.playBeep(ctx, 784, now + 0.4, 0.35);   // G5
    }

    /** Fin de descanso corto: 2 pulsos rápidos (¡a trabajar!) */
    private playShortBreakEnd(ctx: AudioContext): void {
        const now = ctx.currentTime;
        this.playBeep(ctx, 440, now, 0.12);          // A4
        this.playBeep(ctx, 440, now + 0.18, 0.12);   // A4
    }

    /** Fin de descanso largo: acorde descendente suave (¡bien hecho!) */
    private playLongBreakEnd(ctx: AudioContext): void {
        const now = ctx.currentTime;
        this.playBeep(ctx, 784, now, 0.2);           // G5
        this.playBeep(ctx, 659, now + 0.22, 0.2);    // E5
        this.playBeep(ctx, 523, now + 0.44, 0.2);    // C5
        this.playBeep(ctx, 392, now + 0.66, 0.45);   // G4
    }

    private playBeep(
        ctx: AudioContext,
        frequency: number,
        startTime: number,
        duration: number,
        gain = 0.25,
    ): void {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration + 0.05);
    }

    private getCtx(): AudioContext | null {
        try {
            if (!this.audioCtx) {
                this.audioCtx = new AudioContext();
            }
            if (this.audioCtx.state === 'suspended') {
                void this.audioCtx.resume();
            }
            return this.audioCtx;
        } catch {
            return null;
        }
    }
}
