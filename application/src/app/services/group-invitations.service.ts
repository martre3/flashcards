import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GroupInvitation } from '../models/group-invitation';
import { PaginationOptions } from '../models/pagination/pagination-options';
import { Page } from '../models/pagination/page';
import { toHttpParams } from '../utils/to-http-params';
import { GroupInvitationStatus } from '../models/types/group-invitation-status';

@Injectable({
  providedIn: 'root',
})
export class GroupInvitationsService {
  constructor(private http: HttpClient) {}

  create(groupId: string, userIdentifier: string): Observable<GroupInvitation> {
    return this.http.post<GroupInvitation>(`/api/groups/${groupId}/invitations`, {
      identifier: userIdentifier,
    });
  }

  getGroup(groupId: string, options: PaginationOptions): Observable<Page<GroupInvitation>> {
    return this.http.get<Page<GroupInvitation>>(`/api/groups/${groupId}/invitations`, {
      params: toHttpParams(options),
    });
  }

  getUser(userId: string, options: PaginationOptions): Observable<Page<GroupInvitation>> {
    return this.http.get<Page<GroupInvitation>>(`/api/users/${userId}/invitations`, {
      params: toHttpParams(options),
    });
  }

  update(id: string, invitation: GroupInvitation): Observable<GroupInvitation> {
    return this.http.patch<GroupInvitation>(
      `/api/groups/${invitation.groupId}/invitations/${id}`,
      invitation
    );
  }
}
