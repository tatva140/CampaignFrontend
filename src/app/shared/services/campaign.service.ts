import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampaignListResponse } from '../../features/campaign/models/campaign-list.model';
import { ResponseModel } from '../../features/campaign/models/campaign-delete.model';
import { CampaignDetailModel } from '../../features/campaign/models/campaign-detail.model';

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
}
