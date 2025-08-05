import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { CampaignService } from '../services/campaign.service';
import { NotificationsModel } from './notification.model';
declare const toastr: any;

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatListModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    MatBadgeModule,
    MatMenuModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class NavbarComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  notificationCount: number =0;
  notifications: NotificationsModel[]=[];
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private campaignService:CampaignService
  ) {}
  ngOnInit() {
    this.loadNotification();
  }
  onLogout() {
    this.localStorageService.removeItem();
    toastr.success('Logged out Successfully!');
    this.router.navigate(['/auth/login']);
  }
  toggleMenu() {
    this.sidenav.open();
    this.isCollapsed = !this.isCollapsed;
  }
  loadNotification(){
    this.campaignService.loadNotifications()
    .subscribe({
      next: (data) => {
        this.notificationCount=data.length;
        this.notifications=data;
        console.log(data);
      },
      error: (err) => console.error(err),
    });
  }
  redirect(Id:number)
  {
    this.router.navigate(['/invitation/scratch-card',Id]);
  }

}
