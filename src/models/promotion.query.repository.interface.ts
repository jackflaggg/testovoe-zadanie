export interface PromotionQueryRepoInterface {
    getAll(queryParamsTo: any): any;
    findPromotion(id: number): any;
}

export interface UserQueryRepoInterface {
    getAll(queryParamsTo: any): any;
    findId(id: any): any;
    findByEmailSupplier(email: string): any;
}