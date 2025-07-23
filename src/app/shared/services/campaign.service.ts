import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampaignListResponse } from '../../features/campaign/models/campaign-list.model';
import { ResponseModel } from '../../features/campaign/models/campaign-delete.model';
import { CampaignDetailModel } from '../../features/campaign/models/campaign-detail.model';
import { RewardTypesModel } from '../../features/campaign/models/reward-types.model';
import { RewardResponse } from '../../features/campaign/models/reward-response.model';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:5269/api/';
  getCampaigns(pageSize = 4, pageNumber = 1) {
    const response = this.http.get<CampaignListResponse>(
      `${this.apiUrl}campaign/get?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    return response;
  }
  getCampaign(id:number) {
    const response = this.http.get<CampaignDetailModel>(
      `${this.apiUrl}campaign/${id}/get`
    );
    return response;
  }
  delete(
    id: number,
  ){
    const response = this.http.delete<ResponseModel>(`${this.apiUrl}campaign/${id}/delete`);
    return response;
  }
  getRewardTypes(){
    const response = this.http.get<RewardTypesModel[]>(`${this.apiUrl}campaign/reward-types/dropdown`);
    return response;
  }
  getUserBudget(){
    const response = this.http.get<ResponseModel>(`${this.apiUrl}user/neons-balance`);
    return response;
  }
  isUserRegistered(email:string){
    const response = this.http.get<ResponseModel>(`${this.apiUrl}user/registered?email=${email}`);
    return response;
  }
  createCampaign(campaign: any) {
    const response = this.http.post<ResponseModel>(
      `${this.apiUrl}campaign`,
      campaign
    );
    return response;
  }
  getAutoCalculatedReward(reward:number,participants:number){
    const response = this.http.get<RewardResponse>(
      `${this.apiUrl}campaign/auto-calculate-reward-distribution?reward=${reward}&participants=${participants}`
    );
    return response;
  }
}
