export interface queryBlogInterface {
    pageNumber?: number,
    pageSize?:number,
    sortBy?: string,
    sortDirection?: string,
    searchNameTerm?: string | null,
}
export const queryHelperToPromotions = (queryPromo: queryBlogInterface) => {
    return {
        pageNumber: queryPromo.pageNumber ?? 1,
        pageSize: queryPromo.pageSize ?? 10,
        sortBy: queryPromo.sortBy ?? 'createdAt',
        sortDirection: queryPromo.sortDirection ?? 'desc',
        searchNameTerm: queryPromo.searchNameTerm ?? null,
    }
};