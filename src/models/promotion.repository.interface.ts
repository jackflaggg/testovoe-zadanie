import {UserModel} from "@prisma/client";

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
    createUser: (body: any) => Promise<UserModel | null>
    updateUser: (password: string, id: number) =>  Promise<UserModel | null>
    deleteUser: (id: number) => Promise<UserModel | null>
}

