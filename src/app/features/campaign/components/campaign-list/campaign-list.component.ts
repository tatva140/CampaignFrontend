import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CampaignService } from '../../../../shared/services/campaign.service';
import { CardListComponent } from '../../../../shared/components/card-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CreateCampaignComponent } from '../campaign-add-form/campaign-add-form.component';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, CardListComponent, MatDialogModule],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.css',
})
export class CampaignListComponent {
  campaigns: any[] = [];
  pageSize = 9;
  pageNumber = 1;
  hasNextPage = true;
  constructor(
    private campaignService: CampaignService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadMore(false);
  }
  loadMore(flag:boolean) {
    if (flag) {this.pageNumber = 1;this.campaigns=[];}
    this.campaignService
      .getCampaigns(this.pageSize, this.pageNumber)
      .subscribe({
        next: (data) => {
          this.campaigns.push(...data.items);
          this.pageNumber += 1;
          this.hasNextPage = data.hasNextPage;
        },
        error: (err) => console.error(err),
      });
  }

  openModal() {
    this.dialog.open(CreateCampaignComponent, { width: '800px' });
  }
}
