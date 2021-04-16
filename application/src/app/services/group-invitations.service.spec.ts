import { TestBed } from '@angular/core/testing';

import { GroupInvitationsService } from './group-invitations.service';

describe('GroupInvitationsService', () => {
  let service: GroupInvitationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupInvitationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
