import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
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
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class NavbarComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
  ) {}
  onLogout() {
    this.localStorage.removeItem();
    toastr.success('Logged out Successfully!');
    this.router.navigate(['/auth/login']);
  }
  toggleMenu() {
    this.sidenav.open();
    this.isCollapsed = !this.isCollapsed;
  }

}
