import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgpButton } from 'ng-primitives/button';
import {
  LucideAngularModule,
  Coffee,
  Spade,
  Sun,
  Moon,
  Coins,
  Timer,
  LogOut,
  BookOpen,
} from 'lucide-angular';
import { UserService } from '../../core/services/user.service';
import { ThemeService } from '../../core/services/theme.service';

type Section = 'pomodoro' | 'blackjack';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgpButton, LucideAngularModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  readonly userService = inject(UserService);
  readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  readonly activeSection = signal<Section>('pomodoro');

  private readonly tabBase =
    'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer';

  readonly pomodoroTabClass = computed(() =>
    this.activeSection() === 'pomodoro'
      ? `${this.tabBase} bg-violet-500 text-white shadow-md shadow-violet-300/50`
      : `${this.tabBase} text-slate-500 dark:text-slate-400 hover:bg-violet-50 dark:hover:bg-slate-800`,
  );

  readonly blackjackTabClass = computed(() =>
    this.activeSection() === 'blackjack'
      ? `${this.tabBase} bg-pink-500 text-white shadow-md shadow-pink-300/50`
      : `${this.tabBase} text-slate-500 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-800`,
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
