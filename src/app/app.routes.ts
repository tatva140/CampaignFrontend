import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path:'',
    children: authRoutes,
  },
  {
    path:'Register',
    canActivate:[AuthGuard],
    children: authRoutes,
  }
];
