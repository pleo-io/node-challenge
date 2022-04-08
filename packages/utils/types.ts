export interface SortingCriteria<T> {
    field: keyof T
    order?: SortingEnum
}

export enum SortingEnum {
    ASCENDENT = 'asc',
    DESCENDENT = 'desc'
}
