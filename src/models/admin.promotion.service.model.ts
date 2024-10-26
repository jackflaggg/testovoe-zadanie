export interface PromotionAdminServiceInterface {
     loginAdmin:(email: string, password: string) => any ;
 createPromotion: () => any ;
// получение всех акций из репозитория
 deletePromotion: (id: string)=> any ;
 updatePromotion: (id: string)=> any ;
 createSupplier: ()=> any ;
 updatePasswordSupplier: ()=> any ;
 deleteSupplier: (id: string)=> any ;
 statusPromoToSupplier: (id: string)=> any ;
}