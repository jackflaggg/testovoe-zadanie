import { Router } from 'express';

class AdminRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/login", adminLogin);
        this.router.get("/promotions", getAllPromotions);
        this.router.post("/promotions", addPromotion);
        this.router.delete("/promotions/:id", deletePromotion);
        this.router.put("/promotions/:id", updatePromotion);
        this.router.post("/suppliers", createSupplierAccount);
        this.router.put("/suppliers/:id/password", updateSupplierPassword);
        this.router.delete("/suppliers/:id", deleteSupplierAccount);
        this.router.patch("/promotions/:id/status", approveOrRejectPromotion);
    }
}