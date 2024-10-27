import {PromotionModel, UserModel} from "@prisma/client";
import {ErrorCreate, SuccessCreate} from "./create.supplier.models";

export interface PromotionAdminServiceInterface {
     loginAdmin:(email: string, password: string) => Promise<boolean | null> ;
     createPromotion: (title: string, description: string, supplierId: string) => Promise<PromotionModel | null> ;
     updatePromotion: (title: string, description: string, id: string) => Promise<PromotionModel | null> ;
     deletePromotion: (id: number)=> Promise<PromotionModel | null> ;
     updatePasswordSupplier: (id: string, password: string)=> Promise<UserModel | null> ;
     createSupplier: (login: string, email: string, password: string)=> Promise<ErrorCreate | SuccessCreate> ;
     deleteSupplier: (id: string)=> Promise<UserModel | null> ;
     loginUser: (email: string, password: string) => Promise<{jwtToken: string, refreshToken: string} | null> ;
}