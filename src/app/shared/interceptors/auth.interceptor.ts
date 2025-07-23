import { LocalStorageService } from '../services/localstorage.service';
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const localstorage = inject(LocalStorageService);
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }
  const token =localstorage.getItem();
  if(token){
    const cloned= req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  return next(req);
};
