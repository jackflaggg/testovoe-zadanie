export interface PromotionRepoInterface {
    create(body: any): any
    update(body: any): any
    delete(id: number): void
}