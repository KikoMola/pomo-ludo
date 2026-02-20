import { Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [noAuthGuard],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
