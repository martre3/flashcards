export interface Page<T> {
  currentPage: number;
  data: T[];
  from: number;
  lastPage: number;
  total: number;
}
