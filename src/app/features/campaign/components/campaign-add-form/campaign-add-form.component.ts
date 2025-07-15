import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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
export class CampaignAddForm {
  campaignForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.campaignForm = this.fb.group({
      title: ['', Validators.required],
      totalBudget: ['', Validators.required],
      totalParticipants: ['', Validators.required],
      distributiontype: ['Auto-calculate', Validators.required],
      date: ['', Validators.required],
      rewardType: ['neons', Validators.required],
    });
  }

}
