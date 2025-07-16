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
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; id: number },
    private campaignService: CampaignService
  ) {}

  onConfirm(Id: number) {
    this.campaignService.delete(Id).subscribe({
      next: (data) => {
        toastr.success(data.message);
      },
      error: (err) => toastr.error(err.error.message),

    });
    this.dialogRef.close(true);
  }
}
