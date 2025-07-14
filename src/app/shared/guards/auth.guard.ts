import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorage: LocalstorageService
  ) {}

  canActivate(): boolean | UrlTree {
    const token = this.localStorage.getToken();
    if (token) {
      return true;
    }
    return this.router.createUrlTree(['']);
  }
}
