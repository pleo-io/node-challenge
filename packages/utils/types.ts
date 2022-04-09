export interface SortingCriteria<T> {
    field: keyof T
    order?: SortingEnum
}

export enum SortingEnum {
    ASC = 'asc',
    DESC = 'desc'
}
