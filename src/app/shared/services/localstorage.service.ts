import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
   setToken(token:string){
    localStorage.setItem("Token",token);
  }
  getToken(){
    return localStorage.getItem("Token");
  }
  clearToken(){
    localStorage.removeItem("Token");
  }
}
