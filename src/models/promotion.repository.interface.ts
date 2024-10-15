export interface PromotionRepoInterface {
    create(body: any): any
    update(body: any, idPromotion: number): any
    delete(id: number): void
}