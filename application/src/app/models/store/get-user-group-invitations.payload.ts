import { PaginationOptions } from '../pagination/pagination-options';

export interface GetUserGroupInvitationsPayload {
  userId: string;
  options: PaginationOptions;
}
