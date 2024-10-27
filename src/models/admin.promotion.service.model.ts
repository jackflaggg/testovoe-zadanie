export interface PromotionAdminServiceInterface {
     loginAdmin:(email: string, password: string) => any ;
     createPromotion: (title: string, description: string, supplierId: string) => any ;
     updatePromotion: (title: string, description: string, id: string) => any ;
     deletePromotion: (id: number)=> any ;
     updatePasswordSupplier: (id: string, password: string)=> any ;
     createSupplier: (login: string, email: string, password: string)=> any ;
     deleteSupplier: (id: string)=> any ;
     statusPromoToSupplier: (id: string)=> any ;
}