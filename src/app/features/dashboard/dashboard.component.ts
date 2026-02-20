import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgpButton } from 'ng-primitives/button';
import { LucideAngularModule, Coffee, Spade, Sun, Moon, Coins, Timer, LogOut, BookOpen } from 'lucide-angular';
import { UserService } from '../../core/services/user.service';
import { ThemeService } from '../../core/services/theme.service';
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
    private readonly router = inject(Router);

    readonly activeSection = signal<Section>('pomodoro');

    private readonly tabBase =
        'flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer select-none';

    readonly pomodoroTabClass = computed(() =>
        this.activeSection() === 'pomodoro'
            ? `${this.tabBase} bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200 ring-2 ring-orange-200 dark:ring-orange-800`
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
