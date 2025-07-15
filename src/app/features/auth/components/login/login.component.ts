import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';
import { LocalStorageService } from '../../../../shared/services/localstorage.service';
import { Router } from '@angular/router';
declare const toastr: any;
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  isValid = false;
  errorMessage: string[] = [];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?]).{8,}$'
          ),
        ],
      ],
    });
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getEmailErrorMessage(): string {
    const emailControl = this.email;
    if (
      emailControl &&
      (emailControl?.touched || emailControl?.dirty || this.submitted == true)
    ) {
      if (emailControl.getError('required')) {
        this.errorMessage.push('Email is required.');
      }

      if (emailControl.getError('pattern')) {
        this.errorMessage.push('Please enter a valid email address.');
      }
    }
    return '';
  }

  getPassErrorMessage(): string {
    const passControl = this.password;
    if (
      passControl &&
      (passControl?.touched || passControl?.dirty || this.submitted == true)
    ) {
      if (passControl.getError('required')) {
        this.errorMessage.push('Password is required.');
      }
      if (passControl.getError('pattern')) {
        this.errorMessage.push(
          'Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long.'
        );
      }
    }
    return '';
  }
  handleVerfitication(): boolean {
    this.getEmailErrorMessage();
    this.getPassErrorMessage();
    if (this.errorMessage.length > 0) return false;
    return true;
  }
  async onLogin() {
    this.errorMessage = [];
    this.submitted = true;
    this.isValid = this.handleVerfitication();
    if (this.isValid) {
      try {
        const result = await this.authService.login(
          this.loginForm.value['email'],
          this.loginForm.value['password']
        );
        if (result.success) {
          this.localStorageService.setItem(result.data);
          toastr.success(result.message);
          this.router.navigate(['/campaign'])
        } else {
          toastr.error(result.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
}
