export interface Response<T>
{
  success: boolean;
  menssage: string;
  totalRecords: number|null;
  page: number|null;
  pageSize: number|null;
  totalPages: number|null;
  data: T | null;
  value: T | null;
}