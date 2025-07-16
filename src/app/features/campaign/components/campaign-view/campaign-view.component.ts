import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CampaignService } from "../../../../shared/services/campaign.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { CampaignDetailModel } from "../../models/campaign-detail.model";
import { MatIconModule } from "@angular/material/icon";
import {MatChipsModule} from '@angular/material/chips';
declare const toastr: any;

@Component({
  selector: 'app-campaign-view',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatListModule,MatIconModule,MatChipsModule],
  templateUrl: './campaign-view.component.html',
  styleUrl: './campaign-view.component.css',
})
export class CampaignViewComponent{
  campaignId!:string;
  campaignDetails!:CampaignDetailModel;
  isExpired:boolean=false;
  constructor(
    private campaignService: CampaignService,
    private route:ActivatedRoute,
    private router:Router
  ) {}
  ngOnInit() {
    this.campaignId=this.route.snapshot.paramMap.get('id')!;
    this.loadCampaignDetails();
  }

  loadCampaignDetails(){
    this.campaignService
    .getCampaign(Number(this.campaignId))
    .subscribe({
      next: (data) => {
        this.campaignDetails=data;
        if(new Date()>new Date(data.expiryDate)) this.isExpired=true;
      },
      error: (err) =>{
        toastr.error(err.error.description);
        this.router.navigate(['/campaign']);
      },
    });
  }
}