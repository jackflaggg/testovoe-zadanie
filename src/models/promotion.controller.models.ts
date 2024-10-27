import {NextFunction, Request, Response} from "express";

export interface PromotionControllerModels {
    loginAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    promotions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    registerSuppliers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateSuppliers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteSuppliers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createPromotion: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deletePromotion: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updatePromotion: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    loginSupplier: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}