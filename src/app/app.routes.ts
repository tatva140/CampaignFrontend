import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { NavbarComponent } from './shared/layouts/layout.component';
import { CampaignListComponent } from './features/campaign/components/campaign-list/campaign-list.component';
import { CampaignViewComponent } from './features/campaign/components/campaign-view/campaign-view.component';
import { CreateCampaignComponent } from './features/campaign/components/campaign-add-form/campaign-add-form.component';
import { InvitationListComponent } from './features/invitation/components/invitation-list/invitation-list.component';

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
        canActivate: [AuthGuard],
      },
      {
        path: 'view/:id',
        component: CampaignViewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add',
        component: CreateCampaignComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'invitation',
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: InvitationListComponent,
        canActivate: [AuthGuard],
      }
    ],
  },
];
