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
}