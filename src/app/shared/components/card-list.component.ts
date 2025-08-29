import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatDialogModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css',
})
export class CardListComponent {
  @Input() items: any[] = [];
  @Output() cardDeleted = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private router: Router) {}

  openConfirmation(Id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      height: '300px',
      data: {
        message: 'Are you sure you want to delete this campaign?',
        id: Id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cardDeleted.emit();
      } else {
        console.log('Action cancelled.');
      }
    });
  }
  viewCampaign(Id: number) {
    this.router.navigate(['/campaign/view', Id]);
  }
}
