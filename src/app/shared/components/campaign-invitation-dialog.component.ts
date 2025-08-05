import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CampaignService } from '../services/campaign.service';
declare const toastr: any;
@Component({
  selector: 'app-campaign-invitation',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: './campaign-invitation-dialog.component.html',
})
export class CampaignInvitationComponent {
  constructor(
    public dialogRef: MatDialogRef<CampaignInvitationComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: number; email: string; title: string },
    private campaignService: CampaignService
  ) {}

  onConfirm(Id: number) {
    this.campaignService.sendInvite(this.data.id, this.data.email, this.data.title).subscribe({
      next: (data) => {
        toastr.success("Invitation sent successfully");
        this.dialogRef.close(true);
      },
      error: (err) => {
        toastr.error(err);
        console.log(err);
      },
    });
  }
}
