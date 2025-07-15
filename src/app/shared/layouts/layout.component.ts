import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LocalStorageService } from "../services/localstorage.service";
import { Router } from "@angular/router";
declare const toastr: any;

@Component({
  selector:'app-layout',
  standalone:true,
  imports:[RouterOutlet],
  template:`
  <nav class="navbar">
  <a routerLink="/campaign"><h2>Dashboard</h2></a>
  <button (click)="onLogout()">Logout</button>
  </nav>
  <main class="container">
  <router-outlet></router-outlet>
  </main>
  `,
  styleUrl:'./layout.component.css'
})
export class NavbarComponent{
  constructor(private localStorage:LocalStorageService,private router:Router){}
  onLogout(){
    this.localStorage.removeItem();
    toastr.success("Logged out Successfully!");
    this.router.navigate(["/auth/login"]);
  }
}