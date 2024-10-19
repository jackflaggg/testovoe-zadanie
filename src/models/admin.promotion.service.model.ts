import {InAdminModel} from "./admin-model";

export interface PromotionAdminServiceInterface {
     loginAdmin:(body: InAdminModel) => any ;
 createPromotion: () => any ;
// получение всех акций из репозитория
 deletePromotion: (id: string)=> any ;
 updatePromotion: (id: string)=> any ;
 createSupplier: ()=> any ;
 updatePasswordSupplier: ()=> any ;
 deleteSupplier: (id: string)=> any ;
 statusPromoToSupplier: (id: string)=> any ;
}