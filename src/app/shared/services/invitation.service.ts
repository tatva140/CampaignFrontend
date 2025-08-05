import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvitationListResponse } from '../../features/invitation/models/invitation-list.model';
import { ScratchDetailModel } from '../../features/invitation/models/scratch-details.model';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:5269/api/';
  getInvitations(pageSize = 4, pageNumber = 1) {
    const response = this.http.get<InvitationListResponse>(
      `${this.apiUrl}campaign/invitations/get?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    return response;
  }
  getScratchCardDetails(id: number) {
    const response = this.http.get<ScratchDetailModel>(
      `${this.apiUrl}campaign/${id}/scratch-detail`
    );
    return response;
  }
  claimReward(id: number) {
    const response = this.http.post(
      `${this.apiUrl}campaign/${id}/claim-scratch`,
      {}
    );
    return response;
  }
  getPointsHistory(pageSize: number, pageNumber: number, search: string) {
    const response = this.http.get<any>(
      `${this.apiUrl}campaign/points-history?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`
    );
    return response;
  }
}
