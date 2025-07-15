import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  canActivate(): boolean | UrlTree {
    const token = this.localStorage.getItem();
    if (token) {
      return this.router.createUrlTree(['/campaign']);;
    }
    return true;
  }
}
