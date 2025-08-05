import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-points-history-dialog',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatDialogModule,MatCardModule],
  templateUrl: './point-history-dialog.component.html'
})
export class PointHistoryDialogComponent
{
  constructor(
    public dialogRef: MatDialogRef<PointHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {item : any}
  ) {}
}