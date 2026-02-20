import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import { LucideAngularModule, Play, Pause, RotateCcw, Coffee, Brain, Sofa, Coins, Pencil } from 'lucide-angular';
import { interval, Subscription } from 'rxjs';
import { UserService } from '../../../../core/services/user.service';

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

const DEFAULT_DURATIONS: Record<PomodoroMode, number> = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

const SESSIONS_BEFORE_LONG_BREAK = 4;
const RING_RADIUS = 155;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

@Component({
    selector: 'app-pomodoro-timer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgpButton, LucideAngularModule],
    templateUrl: './pomodoro-timer.component.html',
})
export class PomodoroTimerComponent implements OnDestroy {
    private readonly userService = inject(UserService);
    private readonly elRef = inject(ElementRef);

    readonly mode = signal<PomodoroMode>('focus');
    readonly customDurations = signal<Record<PomodoroMode, number>>({ ...DEFAULT_DURATIONS });
    readonly timeLeft = signal<number>(DEFAULT_DURATIONS['focus']);
    readonly isRunning = signal(false);
    readonly sessionsCompleted = signal(0);
    readonly isEditing = signal(false);
    readonly editMinutes = signal(25);

    private timerSub?: Subscription;

    // Exposed constants for the template
    readonly RING_RADIUS = RING_RADIUS;
    readonly CIRCUMFERENCE = CIRCUMFERENCE;

    readonly dashOffset = computed(() => {
        const total = this.customDurations()[this.mode()];
        return CIRCUMFERENCE * (1 - this.timeLeft() / total);
    });

    readonly minutes = computed(() =>
        Math.floor(this.timeLeft() / 60)
            .toString()
            .padStart(2, '0'),
    );

    readonly seconds = computed(() => (this.timeLeft() % 60).toString().padStart(2, '0'));

    readonly modeLabel = computed(() => {
        const labels: Record<PomodoroMode, string> = {
            focus: 'Enfoque',
            shortBreak: 'Descanso corto',
            longBreak: 'Descanso largo',
        };
        return labels[this.mode()];
    });

    readonly ringColorClass = computed(() => {
        if (this.mode() === 'focus') return 'text-orange-400 dark:text-orange-500';
        if (this.mode() === 'shortBreak') return 'text-emerald-400 dark:text-emerald-500';
        return 'text-sky-400 dark:text-sky-500';
    });

    readonly ringBgClass = computed(() => {
        if (this.mode() === 'focus') return 'text-orange-100 dark:text-orange-900/20';
        if (this.mode() === 'shortBreak') return 'text-emerald-100 dark:text-emerald-900/20';
        return 'text-sky-100 dark:text-sky-900/20';
    });

    readonly sessionDots = computed(() =>
        Array.from(
            { length: SESSIONS_BEFORE_LONG_BREAK },
            (_, i) =>
                i < this.sessionsCompleted() % SESSIONS_BEFORE_LONG_BREAK ||
                (this.sessionsCompleted() > 0 && this.sessionsCompleted() % SESSIONS_BEFORE_LONG_BREAK === 0),
        ),
    );

    // Icon references
    readonly Play = Play;
    readonly Pause = Pause;
    readonly RotateCcw = RotateCcw;
    readonly Coffee = Coffee;
    readonly Brain = Brain;
    readonly Sofa = Sofa;
    readonly Coins = Coins;
    readonly Pencil = Pencil;

    toggle(): void {
        if (this.isRunning()) {
            this.pause();
        } else {
            this.start();
        }
    }

    setMode(mode: PomodoroMode): void {
        this.pause();
        this.isEditing.set(false);
        this.mode.set(mode);
        this.timeLeft.set(this.customDurations()[mode]);
    }

    reset(): void {
        this.pause();
        this.isEditing.set(false);
        this.timeLeft.set(this.customDurations()[this.mode()]);
    }

    startEdit(): void {
        if (this.isRunning()) return;
        this.editMinutes.set(Math.round(this.customDurations()[this.mode()] / 60));
        this.isEditing.set(true);
        setTimeout(() => {
            const input = this.elRef.nativeElement.querySelector('[data-edit-input]') as HTMLInputElement;
            input?.focus();
            input?.select();
        });
    }

    confirmEditFromEvent(event: Event): void {
        const value = +(event.target as HTMLInputElement).value;
        this.confirmEdit(value);
    }

    confirmEdit(minutes: number): void {
        if (!this.isEditing()) return;
        const clamped = Math.max(1, Math.min(99, minutes || 1));
        this.customDurations.update(d => ({ ...d, [this.mode()]: clamped * 60 }));
        this.timeLeft.set(clamped * 60);
        this.isEditing.set(false);
    }

    cancelEdit(): void {
        this.isEditing.set(false);
    }

    private start(): void {
        this.isRunning.set(true);
        this.timerSub = interval(1000).subscribe(() => {
            const current = this.timeLeft();
            if (current <= 1) {
                this.complete();
            } else {
                this.timeLeft.update(t => t - 1);
            }
        });
    }

    private pause(): void {
        this.isRunning.set(false);
        this.timerSub?.unsubscribe();
        this.timerSub = undefined;
    }

    private complete(): void {
        this.pause();
        this.timeLeft.set(0);

        if (this.mode() === 'focus') {
            this.sessionsCompleted.update(s => s + 1);
            this.userService.addChips(1);

            const nextMode: PomodoroMode =
                this.sessionsCompleted() % SESSIONS_BEFORE_LONG_BREAK === 0 ? 'longBreak' : 'shortBreak';

            this.setMode(nextMode);
        } else {
            this.setMode('focus');
        }
    }

    ngOnDestroy(): void {
        this.timerSub?.unsubscribe();
    }
}
