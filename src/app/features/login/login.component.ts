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
    templateUrl: './login.component.html',
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
