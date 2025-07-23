import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  InvitationListResponse } from '../../features/invitation/models/invitation-list.model';


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

}
