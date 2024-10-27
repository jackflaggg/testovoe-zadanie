export interface createPromotionInterface {
    title: string,
    description: string,
    published: boolean,
    status: string,
    supplier: {
        connect: { id : number}
    }
}

export interface PromotionRepoInterface {
    createPromotion: (body: createPromotionInterface) => any
    updatePromotion: (body: any, idPromotion: number) => any
    deletePromotion: (id: number) => any
}

export interface UserRepoInterface {
    createUser: (body: any) => any
    updateUser: (password: string, id: number) => any
    deleteUser: (id: number) => any
}

