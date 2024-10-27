export interface PromotionRepoInterface {
    create: (body: any) => any
    update: (body: any, idPromotion: number) => any
    delete: (id: number) => any
}

export interface UserRepoInterface {
    createUser: (body: any) => any
    updateUser: (password: string, id: number) => any
    deleteUser: (id: number) => any
}

