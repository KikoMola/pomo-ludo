import { Injectable, signal } from '@angular/core';

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

@Injectable({ providedIn: 'root' })
export class PomodoroStateService {
    readonly mode = signal<PomodoroMode>('focus');
}
