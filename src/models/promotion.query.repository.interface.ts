export interface PromotionQueryRepoInterface {
    getAll(queryParamsTo: any): any;
    find(id: any): any;
}

export interface UserQueryRepoInterface {
    getAll(queryParamsTo: any): any;
    findId(id: any): any;
    findByEmailSupplier(email: string): any;
}