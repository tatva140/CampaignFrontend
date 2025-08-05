import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { RedeemNowDialog } from './redeemnow-dialog.component';
@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './invitation-card.component.html',
  styleUrl: './invitation-card.component.css',
})
export class InvitationCardComponent {
  @Input() items: any[] = [];
  constructor(private dialog: MatDialog) {}
  openModal(createdBy: string, id:number) {
    this.dialog.open(RedeemNowDialog, {
      width: '450px',
      height: '300px',
      data: {
        createdBy: createdBy,
        id: id,
      },
    });
  }
}
