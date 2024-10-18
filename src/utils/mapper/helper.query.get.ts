export const queryHelperToPromotions = (queryBlog: any) => {
    return {
        pageNumber: queryBlog.pageNumber ?? 1,
        pageSize: queryBlog.pageSize ?? 10,
        sortBy: queryBlog.sortBy ?? 'createdAt',
        sortDirection: queryBlog.sortDirection ?? 'desc',
        searchNameTerm: queryBlog.searchNameTerm ?? null,
    }
};