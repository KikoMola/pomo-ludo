import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard = (): boolean | UrlTree => {
    const userService = inject(UserService);
    const router = inject(Router);
    return userService.name() ? true : router.createUrlTree(['/login']);
};

export const noAuthGuard = (): boolean | UrlTree => {
    const userService = inject(UserService);
    const router = inject(Router);
    return !userService.name() ? true : router.createUrlTree(['/dashboard']);
};
