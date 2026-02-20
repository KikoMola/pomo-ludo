import { computed, effect, inject, Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly userService = inject(UserService);

    readonly isDark = computed(() => this.userService.theme() === 'dark');

    constructor() {
        effect(() => {
            document.documentElement.classList.toggle('dark', this.isDark());
        });
    }

    toggle(): void {
        this.userService.setTheme(this.isDark() ? 'light' : 'dark');
    }
}
