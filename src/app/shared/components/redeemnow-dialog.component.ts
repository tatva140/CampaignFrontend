import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './redeemnow-dialog.component.html',
})
export class RedeemNowDialog {
  constructor(
    public dialogRef: MatDialogRef<RedeemNowDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { createdBy: string; id: number }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
