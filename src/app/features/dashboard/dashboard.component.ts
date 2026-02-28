import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgpButton } from 'ng-primitives/button';
import { LucideAngularModule, Coffee, Spade, Sun, Moon, Coins, Timer, LogOut, BookOpen } from 'lucide-angular';
import { UserService } from '../../core/services/user.service';
import { ThemeService } from '../../core/services/theme.service';
import { PomodoroStateService } from '../../core/services/pomodoro-state.service';
import { PomodoroTimerComponent } from './components/pomodoro-timer/pomodoro-timer.component';
import { BlackjackComponent } from './components/blackjack/blackjack.component';

type Section = 'pomodoro' | 'blackjack';

@Component({
    selector: 'app-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgpButton, LucideAngularModule, PomodoroTimerComponent, BlackjackComponent],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    readonly userService = inject(UserService);
    readonly themeService = inject(ThemeService);
    private readonly pomodoroState = inject(PomodoroStateService);
    private readonly router = inject(Router);

    readonly activeSection = signal<Section>('pomodoro');

    readonly mainClass = computed(() => {
        const base = 'flex-1 flex flex-col min-h-[calc(100vh-80px)]';
        return this.activeSection() === 'blackjack'
            ? `${base} p-4 sm:p-6 items-stretch`
            : `${base} p-4 sm:p-8 items-center justify-center`;
    });

    private readonly tabBase =
        'flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer select-none';

    private readonly pomodoroActiveColors = computed(() => {
        const mode = this.pomodoroState.mode();
        if (mode === 'shortBreak') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 ring-2 ring-emerald-200 dark:ring-emerald-800';
        if (mode === 'longBreak') return 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-200 ring-2 ring-sky-200 dark:ring-sky-800';
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200 ring-2 ring-orange-200 dark:ring-orange-800';
    });

    readonly chipsBadgeClass = computed(() => {
        const mode = this.pomodoroState.mode();
        if (mode === 'shortBreak') return 'bg-emerald-100/60 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-200';
        if (mode === 'longBreak') return 'bg-sky-100/60 dark:bg-sky-900/40 border-sky-200 dark:border-sky-700/50 text-sky-700 dark:text-sky-200';
        return 'bg-amber-100/60 dark:bg-amber-900/40 border-amber-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-200';
    });

    readonly chipsIconBgClass = computed(() => {
        const mode = this.pomodoroState.mode();
        if (mode === 'shortBreak') return 'bg-emerald-200 dark:bg-emerald-700/50';
        if (mode === 'longBreak') return 'bg-sky-200 dark:bg-sky-700/50';
        return 'bg-amber-200 dark:bg-amber-700/50';
    });

    readonly pomodoroTabClass = computed(() =>
        this.activeSection() === 'pomodoro'
            ? `${this.tabBase} ${this.pomodoroActiveColors()}`
            : `${this.tabBase} text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-orange-600 dark:hover:text-orange-300`,
    );

    readonly blackjackTabClass = computed(() =>
        this.activeSection() === 'blackjack'
            ? `${this.tabBase} bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200 ring-2 ring-rose-200 dark:ring-rose-800`
            : `${this.tabBase} text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-rose-600 dark:hover:text-rose-300`,
    );

    readonly Coffee = Coffee;
    readonly Spade = Spade;
    readonly Sun = Sun;
    readonly Moon = Moon;
    readonly Coins = Coins;
    readonly Timer = Timer;
    readonly LogOut = LogOut;
    readonly BookOpen = BookOpen;

    logout(): void {
        this.userService.logout();
        this.router.navigate(['/login']);
    }
}
