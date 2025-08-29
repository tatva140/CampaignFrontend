import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { LocalStorageService } from '../../../../shared/services/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
declare const toastr: any;

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  isValid = false;
  participantId: number = 0;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.participantId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
        this.duplicateEmail.bind(this),
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
      name: [
        '',
        [Validators.required, Validators.maxLength(50), this.notNullValidator],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,9}$')],
      ],
    });
  }
  notNullValidator(control: any): { [key: string]: boolean } | null {
    if (control.value && control.value.trim() === '') {
      return { notNull: true };
    }
    return null;
  }
  async duplicateEmail(
    control: any
  ): Promise<{ [key: string]: boolean } | null> {
    const email = control.value;
    if (email) {
      const isUserExists = await this.authService.isUserExists(email);
      if (isUserExists.success) {
        return { duplicateEmail: true };
      }
    }
    return null;
  }
  async onRegister() {
    this.submitted = true;
    if (!this.registerForm.invalid) {
      try {
        const result = await this.authService.register(
          this.registerForm.value['email'],
          this.registerForm.value['password'],
          this.registerForm.value['name'],
          this.registerForm.value['phone'],
          this.participantId
        );
        if (result.status) {
          if (this.participantId != 0) {
            try {
              const result = await this.authService.login(
                this.registerForm.value['email'],
                this.registerForm.value['password']
              );
              if (result.success) {
                this.localStorageService.setItem(result.data);
                this.router.navigate([
                  '/invitation/scratch-card',
                  this.participantId,
                ]);
              } else {
                toastr.error(result.message);
              }
            } catch (err) {
              console.error(err);
            }
          } else {
            this.router.navigate(['/']);
          }
          toastr.success(result.message);
        } else {
          toastr.error(result.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
}
