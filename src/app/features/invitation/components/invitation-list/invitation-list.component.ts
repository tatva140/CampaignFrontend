import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvitationService } from '../../../../shared/services/invitation.service';
import { InvitationCardComponent } from '../../../../shared/components/invitation-card.component';

@Component({
  selector: 'app-invitation-list',
  standalone: true,
  imports: [CommonModule, InvitationCardComponent],
  templateUrl: './invitation-list.component.html',
  styleUrl: './invitation-list.component.css',
})
export class InvitationListComponent {
  invitations: any[] = [];
  pageSize =5;
  pageNumber = 1;
  hasNextPage = true;
  constructor(
    private invitationService: InvitationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMore(false);
  }
  loadMore(flag:boolean) {
    if (flag) {this.pageNumber = 1;this.invitations=[];}
    this.invitationService
      .getInvitations(this.pageSize, this.pageNumber)
      .subscribe({
        next: (data) => {
          this.invitations.push(...data.items);
          this.pageNumber += 1;
          this.hasNextPage = data.hasNextPage;
        },
        error: (err) => console.error(err),
      });
  }

}
