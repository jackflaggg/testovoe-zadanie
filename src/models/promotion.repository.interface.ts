import {PromotionModel, UserModel} from "@prisma/client";

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
    createPromotion: (body: createPromotionInterface) =>  Promise<PromotionModel | null>
    updatePromotion: (body: any, idPromotion: number) =>  Promise<PromotionModel | null>
    deletePromotion: (id: number) =>  Promise<PromotionModel | null>
}

export interface UserRepoInterface {
    createUser: (body: any) => Promise<UserModel | null>
    updateUser: (password: string, id: number) =>  Promise<UserModel | null>
    deleteUser: (id: number) => Promise<UserModel | null>
}

