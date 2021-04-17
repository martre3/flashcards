import { PaginationOptions } from '../pagination/pagination-options';
import { GetPayload } from './get.payload';

export interface GetPagePayload extends GetPayload {
  options: PaginationOptions;
}
