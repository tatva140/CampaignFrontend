import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-campaign-add',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  templateUrl: './campaign-add-form.component.html',
  styleUrl: './campaign-add-form.component.css',
  providers: [provideNativeDateAdapter()],
})
export class CreateCampaignComponent implements OnInit {
  createCampaignForm!: FormGroup;

  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    this.createCampaignForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      totalReward: [null, [Validators.required, Validators.min(10)]],
      totalParticipants: [null, [Validators.required, Validators.min(1), Validators.max(8)]],
      distributionType: ['Auto-calculated'],
      expiryDate: ['', [Validators.required, this.futureDateValidator]],
      rewardTypeId: ['', Validators.required],
      participants: this.fb.array([], [
        this.noDuplicateEmailsValidator,
        this.matchTotalParticipantsValidator.bind(this),
        this.totalRewardMatchesSumValidator.bind(this)
      ])
    });

    this.addParticipant();
  }


  get participants(): FormArray {
    return this.createCampaignForm.get('participants') as FormArray;
  }

  addParticipant(): void {
    this.participants.push(this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      rewardAmount: [null, [Validators.required, Validators.min(1)]]
    }));
  }

  removeParticipant(index: number): void {
    this.participants.removeAt(index);
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    if (!control.value || isNaN(inputDate.getTime()) || inputDate <= new Date()) {
      return { invalidExpiryDate: true };
    }
    return null;
  }

  noDuplicateEmailsValidator = (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;
    const emails = formArray.controls.map(c => c.get('email')?.value);
    const duplicates = emails.filter((item, index) => emails.indexOf(item) !== index);
    if (duplicates.length > 0) {
      return { duplicateEmails: true };
    }
    return null;
  };

  matchTotalParticipantsValidator = (control: AbstractControl): ValidationErrors | null => {
    const expected = this.createCampaignForm?.get('totalParticipants')?.value;
    if (expected !== undefined && expected !== null) {
      if (control.value.length !== expected) {
        return { participantsCountMismatch: true };
      }
    }
    return null;
  };

  totalRewardMatchesSumValidator = (control: AbstractControl): ValidationErrors | null => {
    const expectedTotal = this.createCampaignForm?.get('totalReward')?.value;
    const sum = control.value.reduce((acc: number, p: any) => acc + (Number(p.rewardAmount) || 0), 0);
    if (expectedTotal !== undefined && expectedTotal !== null && sum !== expectedTotal) {
      return { rewardSumMismatch: true };
    }
    return null;
  };

  submit(): void {
    if (this.createCampaignForm.invalid) {
      this.createCampaignForm.markAllAsTouched();
      return;
    }

    console.log('Form Submitted:', this.createCampaignForm.value);
  }

}



