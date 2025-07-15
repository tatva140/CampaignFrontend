import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { AuthGuard } from './shared/guards/auth.guard';
import { NavbarComponent } from './shared/layouts/layout.component';
import { CampaignListComponent } from './features/campaign/components/campaign-list/campaign-list.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'campaign',
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: CampaignListComponent,
        // canActivate: [AuthGuard],
      },
    ],
  },
];
