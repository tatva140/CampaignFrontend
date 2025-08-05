import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reward-dialog.component.html',
})
export class RewardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RewardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { rewardText: string },
  ) {}
  closeDialog(): void {
    this.dialogRef.close();
  }
}
