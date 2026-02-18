import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgpInput } from 'ng-primitives/input';
import { NgpButton } from 'ng-primitives/button';
import { NgpFormField, NgpLabel } from 'ng-primitives/form-field';
import { LucideAngularModule, BookOpen, Coffee, Spade, LogIn, Sun, Moon } from 'lucide-angular';
import { UserService } from '../../core/services/user.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgpInput, NgpButton, NgpFormField, NgpLabel, LucideAngularModule],
  template: `
    <div
      class="relative min-h-screen flex items-center justify-center overflow-hidden
             bg-linear-to-br from-violet-50 via-pink-50 to-amber-50
             dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 p-4"
    >
      <!-- Blobs decorativos -->
      <div
        class="pointer-events-none absolute -top-20 -left-20 w-80 h-80
               bg-violet-200/50 dark:bg-violet-800/20 rounded-full blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96
               bg-pink-200/50 dark:bg-pink-900/20 rounded-full blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute top-1/2 left-1/4 w-48 h-48
               bg-amber-200/40 dark:bg-amber-900/10 rounded-full blur-3xl"
      ></div>

      <!-- Card -->
      <div
        class="relative z-10 w-full max-w-sm
               bg-white/80 dark:bg-slate-800/70
               backdrop-blur-xl rounded-3xl
               shadow-2xl shadow-violet-200/60 dark:shadow-purple-950/60
               border border-white/60 dark:border-slate-700/60
               p-8 sm:p-10"
      >
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8">
          <div class="flex items-center gap-2 mb-4">
            <div class="p-2.5 bg-violet-100 dark:bg-violet-900/50 rounded-2xl shadow-sm">
              <lucide-angular
                [img]="Coffee"
                [size]="26"
                strokeWidth="1.75"
                class="text-violet-500 dark:text-violet-300"
              />
            </div>
            <div class="p-2.5 bg-pink-100 dark:bg-pink-900/50 rounded-2xl shadow-sm">
              <lucide-angular
                [img]="BookOpen"
                [size]="26"
                strokeWidth="1.75"
                class="text-pink-500 dark:text-pink-300"
              />
            </div>
            <div class="p-2.5 bg-amber-100 dark:bg-amber-900/50 rounded-2xl shadow-sm">
              <lucide-angular
                [img]="Spade"
                [size]="26"
                strokeWidth="1.75"
                class="text-amber-500 dark:text-amber-400"
              />
            </div>
          </div>

          <h1 class="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Pomo<span class="text-violet-500 dark:text-violet-300">Ludo</span>
          </h1>
          <p class="mt-2 text-sm text-center text-slate-500 dark:text-slate-400 leading-relaxed">
            Estudia con enfoque. Descansa con estilo.<br />
            Juega lo que te has ganado.
          </p>
        </div>

        <!-- Formulario -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-5">
          <div ngpFormField class="flex flex-col gap-1.5">
            <label
              ngpLabel
              for="player-name"
              class="text-sm font-semibold text-slate-600 dark:text-slate-300"
            >
              ¿Cómo te llamas?
            </label>
            <input
              ngpInput
              id="player-name"
              type="text"
              formControlName="name"
              placeholder="Tu nombre aquí..."
              autocomplete="name"
              class="w-full px-4 py-3 rounded-xl text-sm
                     border border-violet-200 dark:border-slate-600
                     bg-white dark:bg-slate-700/60
                     text-slate-800 dark:text-slate-100
                     placeholder:text-slate-400 dark:placeholder:text-slate-500
                     focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-500
                     transition-all duration-200"
            />
          </div>

          <button
            ngpButton
            type="submit"
            [disabled]="form.invalid"
            class="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl
                   font-bold text-white text-sm
                   bg-linear-to-r from-violet-400 to-pink-400
                   hover:from-violet-500 hover:to-pink-500
                   disabled:opacity-50 disabled:cursor-not-allowed
                   shadow-lg shadow-violet-200 dark:shadow-violet-900/40
                   transition-all duration-200 cursor-pointer"
          >
            <lucide-angular [img]="LogIn" [size]="16" strokeWidth="2.5" />
            Empezar a estudiar
          </button>
        </form>
      </div>

      <!-- Toggle tema – esquina sup. derecha -->
      <button
        ngpButton
        (click)="themeService.toggle()"
        aria-label="Cambiar tema"
        class="absolute top-4 right-4 z-20 p-2.5 rounded-2xl cursor-pointer
               bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm
               border border-white/60 dark:border-slate-700
               text-slate-500 dark:text-slate-400
               hover:text-violet-500 dark:hover:text-violet-300
               shadow-sm transition-all duration-200"
      >
        @if (themeService.isDark()) {
          <lucide-angular [img]="Sun" [size]="18" strokeWidth="1.75" />
        } @else {
          <lucide-angular [img]="Moon" [size]="18" strokeWidth="1.75" />
        }
      </button>
    </div>
  `,
})
export class LoginComponent {
  private readonly router = inject(Router);
  readonly userService = inject(UserService);
  readonly themeService = inject(ThemeService);

  readonly BookOpen = BookOpen;
  readonly Coffee = Coffee;
  readonly Spade = Spade;
  readonly LogIn = LogIn;
  readonly Sun = Sun;
  readonly Moon = Moon;

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.userService.setName(this.form.controls.name.value.trim());
    this.router.navigate(['/dashboard']);
  }
}
