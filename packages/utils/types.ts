export type Page<T> = {
  page: number
  total: number
  pageSize: number
  data: T[]
 }

export enum SortingEnum {
  ASCENDENT = 'asc',
  DESCENDENT = 'desc'
}

export type SortingType<Criteria> = {

    field: keyof Criteria
    sort?: SortingEnum

 }

export type QueryPage<Criteria> = {
   page?: number
   pageSize?: number
   sorting?: SortingType<Criteria>
 } & Partial<Criteria>;
