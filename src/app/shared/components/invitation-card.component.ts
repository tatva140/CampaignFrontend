import { CommonModule } from '@angular/common';
import { Component, Input,  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './invitation-card.component.html',
  styleUrl: './invitation-card.component.css',
})
export class InvitationCardComponent {
  @Input() items: any[] = [];


}
