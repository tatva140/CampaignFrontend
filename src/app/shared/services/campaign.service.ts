import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampaignListResponse } from '../../features/campaign/models/campaign-list.model';

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
}
