export interface PromotionAdminServiceInterface {
     loginAdmin:(email: string, password: string) => any ;
     createPromotion: () => any ;
     deletePromotion: (id: string)=> any ;
     updatePasswordSupplier: (id: string, password: string)=> any ;
     createSupplier: (login: string, email: string, password: string)=> any ;
     deleteSupplier: (id: string)=> any ;
     statusPromoToSupplier: (id: string)=> any ;
}