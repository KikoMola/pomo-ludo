import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
    readonly name = signal<string>(localStorage.getItem('pomo-ludo-user') ?? '');
    readonly chips = signal<number>(parseInt(localStorage.getItem('pomo-ludo-chips') ?? '0', 10));

    setName(name: string): void {
        this.name.set(name);
        localStorage.setItem('pomo-ludo-user', name);
    }

    addChips(count: number): void {
        this.chips.update(c => c + count);
        localStorage.setItem('pomo-ludo-chips', this.chips().toString());
    }

    spendChips(count: number): boolean {
        if (this.chips() < count) return false;
        this.chips.update(c => c - count);
        localStorage.setItem('pomo-ludo-chips', this.chips().toString());
        return true;
    }

    logout(): void {
        this.name.set('');
        localStorage.removeItem('pomo-ludo-user');
    }
}
