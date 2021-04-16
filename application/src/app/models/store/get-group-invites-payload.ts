import { PaginationOptions } from '../pagination/pagination-options';

export interface GetGroupInvitesPayload {
  groupId: string;
  options: PaginationOptions;
}
