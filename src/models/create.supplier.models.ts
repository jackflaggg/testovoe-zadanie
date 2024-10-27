import {PromotionModel, UserModel} from "@prisma/client";

export interface ErrorCreate {
    status: string,
    extensions: any,
    data: null
}

export interface SuccessCreate {
    status: string,
    data: UserModel | PromotionModel | string
}