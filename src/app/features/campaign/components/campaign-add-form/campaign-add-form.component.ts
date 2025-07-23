import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CampaignService } from '../../../../shared/services/campaign.service';
import { RewardTypesModel } from '../../models/reward-types.model';
import { ParticipantFormComponent } from '../../../../shared/components/participant-form.component';
declare const toastr: any;

@Component({
  selector: 'app-campaign-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    ParticipantFormComponent,
  ],
  templateUrl: './campaign-add-form.component.html',
  styleUrl: './campaign-add-form.component.css',
  providers: [provideNativeDateAdapter()],
})
export class CreateCampaignComponent implements OnInit {
  createCampaignForm!: FormGroup;
  participantForm!: FormGroup;
  rewardTypes: RewardTypesModel[] = [];
  minDate = new Date();
  userBudegt = 0;
  selectedTabIndex = 0;
  step2Enabled = false;
  step3Enabled = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.createCampaignForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      totalReward: [
        null,
        [Validators.required, Validators.min(10), this.hasEnoughBudget],
      ],
      totalParticipants: [
        null,
        [Validators.required, Validators.min(1), Validators.max(9)],
      ],
      distributionType: ['Custom'],
      expiryDate: ['', [Validators.required, this.futureDateValidator]],
      rewardTypeId: [{ value: 1, disabled: true }, Validators.required],
    });
    this.participantForm = this.fb.group({
      participants: this.fb.array(
        [],
        [
          this.noDuplicateEmailsValidator,
          this.totalRewardMatchesSumValidator.bind(this),
        ]
      ),
    });
    this.loadRewardTypes();
    this.getUserBudget();
  }
  initializeParticipants(count: number) {
    const formArray = this.participantForm.get('participants') as FormArray;
    formArray.clear();
    for (let i = 0; i < count; i++) {
      formArray.push(
        this.fb.group({
          email: [
            '',
            [
              Validators.required,
              Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            ],
          ],
          rewardAmount: ['', [Validators.required, Validators.min(1)]],
          isRegisteredUser: [false],
        })
      );
    }
  }
  get participants(): FormGroup[] {
    return (this.participantForm.get('participants') as FormArray)
      .controls as FormGroup[];
  }
  get participantControl(): AbstractControl {
    return this.participantForm.get('participants')!;
  }
  loadRewardTypes() {
    this.campaignService.getRewardTypes().subscribe({
      next: (data) => {
        this.rewardTypes = data;
      },
      error: (err) => console.error(err),
    });
  }
  getUserBudget() {
    this.campaignService.getUserBudget().subscribe({
      next: (data) => {
        this.userBudegt = data.data;
      },
      error: (err) => console.error(err),
    });
  }
  goBack(): void {
    this.location.back();
  }
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    if (control.value && inputDate < new Date()) {
      return { invalidExpiryDate: true };
    }
    return null;
  }
  noDuplicateEmailsValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const formArray = control as FormArray;
    const emails = formArray.controls.map((c) => c.get('email')?.value);
    if (emails.some((e) => e.length <= 0)) {
      return null;
    }
    const duplicates = emails.filter(
      (item, index) => emails.indexOf(item) !== index
    );
    if (duplicates.length > 0) {
      return { duplicateEmails: true };
    }
    return null;
  };
  totalRewardMatchesSumValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    if(this.createCampaignForm.value['distributionType'] === 'Auto-calculated') {
      return null;
    }
    const formArray = control as FormArray;
    const rewardAmount = formArray.controls.map(
      (c) => c.get('rewardAmount')?.value
    );
    const expectedTotal = this.createCampaignForm?.get('totalReward')?.value;
    const sum = control.value.reduce(
      (acc: number, p: any) => acc + (Number(p.rewardAmount) || 0),
      0
    );
    if (rewardAmount.some((e) => e == 0)) {
      return null;
    }

    if (
      expectedTotal !== undefined &&
      expectedTotal !== null &&
      sum !== expectedTotal
    ) {
      return { rewardSumMismatch: true };
    }
    return null;
  };
  hasEnoughBudget = (control: AbstractControl): ValidationErrors | null => {
    const totalBudegt = this.createCampaignForm?.get('totalReward')?.value;
    if (totalBudegt > this.userBudegt) return { notEnoughBalance: true };

    return null;
  };
  next(): void {
    if (this.createCampaignForm.invalid) {
      this.createCampaignForm.markAllAsTouched();
      return;
    }
    this.step2Enabled = true;
    this.selectedTabIndex = 1;
    this.initializeParticipants(
      this.createCampaignForm.value['totalParticipants']
    );
    if (this.createCampaignForm.value['distributionType'] === 'Auto-calculated') {
      this.campaignService
        .getAutoCalculatedReward(
          this.createCampaignForm.value['totalReward'],
          this.createCampaignForm.value['totalParticipants']
        )
        .subscribe({
          next: (data) => {
            const participantsArray = this.participantForm.get('participants') as FormArray;
            participantsArray.controls.forEach((control, index) => {
              control.get('rewardAmount')?.disable();
              control.get('rewardAmount')?.setValue(data.data[index]);
            });
          },
          error: (err) => console.error(err),
        });
    }
  }
  nextPage(): void {
    if (this.participantForm.invalid) {
      this.participantForm.markAllAsTouched();
      return;
    }
    this.step3Enabled = true;
    this.selectedTabIndex = 2;
  }
  createCampaign() {
    if (this.createCampaignForm.invalid || this.participantForm.invalid) {
      this.createCampaignForm.markAllAsTouched();
      this.participantForm.markAllAsTouched();
      return;
    }
    const campaignData = {
      ...this.createCampaignForm.getRawValue(),
      participants: this.participantForm.getRawValue().participants,
    };
    this.campaignService.createCampaign(campaignData).subscribe({
      next: (data) => {
        toastr.success('Campaign created successfully');
        this.goBack();
      },
      error: (err) => console.error(err),
    });
  }
}
