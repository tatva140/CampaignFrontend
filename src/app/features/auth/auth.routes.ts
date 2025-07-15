import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GuestGuard } from '../../shared/guards/guest.guard';

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent ,canActivate:[GuestGuard]},
  { path: 'register', component: RegisterComponent },
];
