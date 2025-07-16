import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-card-list',
  standalone:true,
  imports: [CommonModule],
  template:`
  <div class="card-container">
  <div class="card" *ngFor="let item of items">
  <h3>{{item.title}}</h3>
  <p>Total Participants: {{item.totalParticipants}}</p>
  <p>Total Reward: {{item.totalReward}}</p>
  <p>Expiry Date: {{item.expiryDate}}</p>
  </div>
  </div>`,
  styleUrl:'./card-list.component.css'
})
export class CardListComponent{
  @Input() items: any[]=[];
}<!-- scratch-card.component.html -->
<mat-card class="scratch-card">
  <!-- Card Header -->
  <div class="card-header">
    <div class="card-title">
      Eid Scratch Gift
    </div>
    <button mat-icon-button>
      <mat-icon>delete</mat-icon>
    </button>
  </div>

  <!-- Status -->
  <div class="status-badge new">New</div>

  <!-- Info -->
  <div class="card-info">
    <div class="info-item">
      <mat-icon>event</mat-icon>
      Exp. 30/09/2025
    </div>
    <div class="info-item">
      <mat-icon>check_circle</mat-icon>
      Claimed: 2/5
    </div>
    <div class="info-item">
      <mat-icon>card_giftcard</mat-icon>
      NEONs: 200
    </div>
  </div>

  <!-- View Details -->
  <button mat-stroked-button color="primary" class="view-button">
    View Details
  </button>
</mat-card>

<!-- Create New -->
<div class="create-wrapper">
  <button mat-raised-button color="primary">
    Create Scratch & Win
  </button>
</div>
