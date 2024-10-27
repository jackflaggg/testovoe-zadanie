export interface PromotionQueryRepoInterface {
    getAll(queryParamsTo: any): any;
    find(id: any): any;
    findByEmailSupplier(email: string): any;
}