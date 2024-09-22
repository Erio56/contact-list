import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';
import { HomePageComponent } from './features/contacts/home-page/home-page.component';
import { authGuard } from './core/guards/auth.guard';
import { AccountCreationComponent } from './features/auth/account-creation/account-creation.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: AccountCreationComponent },
  { path: 'dashboard', component: HomePageComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
