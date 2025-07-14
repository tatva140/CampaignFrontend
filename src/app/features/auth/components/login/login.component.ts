import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';
import { LocalstorageService } from '../../../../shared/services/localstorage.service';
declare const toastr: any;
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {
  email = '';
  password = '';
  validationErrors = {};

  constructor(
    private authService: AuthService,
    private localStorageService: LocalstorageService
  ) {}

  async onLogin() {
    this.validationErrors = {};

    try {
      const result = await this.authService.login(this.email, this.password);
      if (result.success) {
        this.localStorageService.setToken(result.data);
        toastr.success(result.message);
      } else if(result.errors!=null){
        this.validationErrors = Object.values(result.errors).flat();
      }else{
        toastr.error(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
