import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

interface UserProfile {
    chips: number;
    theme: Theme;
}

type ProfilesMap = Record<string, UserProfile>;

const PROFILES_KEY = 'pomo-ludo-profiles';
const CURRENT_USER_KEY = 'pomo-ludo-current-user';

@Injectable({ providedIn: 'root' })
export class UserService {
    readonly name = signal<string>(localStorage.getItem(CURRENT_USER_KEY) ?? '');
    readonly chips = signal<number>(0);
    readonly theme = signal<Theme>(this.systemTheme());

    constructor() {
        const currentName = this.name();
        if (currentName) {
            const profile = this.loadProfile(currentName);
            this.chips.set(profile.chips);
            this.theme.set(profile.theme);
        }
    }

    login(name: string): void {
        const profile = this.loadProfile(name);
        this.name.set(name);
        this.chips.set(profile.chips);
        this.theme.set(profile.theme);
        localStorage.setItem(CURRENT_USER_KEY, name);
    }

    setTheme(theme: Theme): void {
        this.theme.set(theme);
        this.persistProfile();
    }

    addChips(count: number): void {
        this.chips.update(c => c + count);
        this.persistProfile();
    }

    spendChips(count: number): boolean {
        if (this.chips() < count) return false;
        this.chips.update(c => c - count);
        this.persistProfile();
        return true;
    }

    logout(): void {
        this.name.set('');
        this.chips.set(0);
        this.theme.set(this.systemTheme());
        localStorage.removeItem(CURRENT_USER_KEY);
    }

    private loadProfile(name: string): UserProfile {
        const profiles = this.readProfiles();
        return profiles[name] ?? { chips: 0, theme: this.systemTheme() };
    }

    private persistProfile(): void {
        const currentName = this.name();
        if (!currentName) return;
        const profiles = this.readProfiles();
        profiles[currentName] = { chips: this.chips(), theme: this.theme() };
        localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    }

    private readProfiles(): ProfilesMap {
        const raw = localStorage.getItem(PROFILES_KEY);
        return raw ? (JSON.parse(raw) as ProfilesMap) : {};
    }

    private systemTheme(): Theme {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
}
