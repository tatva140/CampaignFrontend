import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(): boolean | UrlTree {
    const token = this.localStorageService.getItem();
    if (token) {
      return true;
    }
    return this.router.createUrlTree(['/auth/login']);
  }
}
