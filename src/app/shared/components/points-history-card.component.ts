import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PointHistoryDialogComponent } from './point-history-dialog.component';

@Component({
  selector: 'app-points-history-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDialogModule],
  templateUrl: './points-history-card.component.html',
  styleUrls: ['./points-history-card.component.css'],
})
export class PointsHistoryCardComponent {
  @Input() items: any[] = [];
  constructor(private dialog: MatDialog) {}

  viewDetails(item: any) {
    this.dialog.open(PointHistoryDialogComponent, {
      width: '600px',
      height: '500px',
      data: { item: item },
    });
  }
}
