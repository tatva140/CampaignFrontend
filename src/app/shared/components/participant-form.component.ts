import { CommonModule } from '@angular/common';
import { Component,  Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { CampaignService } from '../services/campaign.service';
declare const toastr: any;
@Component({
  selector: 'app-participant-form',
  standalone: true,
  imports: [
    CommonModule,
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
  ],
  templateUrl: './participant-form.component.html',
  styles: ` .full-width {
    width: 100%;
  }
  .card-container {
    width: 80%;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background: #ffffff;
}`,
})
export class ParticipantFormComponent {
  @Input() form!: FormGroup;
  isRegistered! :boolean;

  constructor(private campaignService: CampaignService) {}

  checkIsUserRegistred(email:string) {
    if (this.form.get('email')?.valid) {
      this.campaignService.isUserRegistered(email).subscribe({
        next: (data) => {
          this.isRegistered = data.success;
          this.form.get('isRegisteredUser')?.setValue(data.success);
        },
        error: (err) => console.error(err),
      });
    }
  }

}