import {NextFunction, Request, Response} from "express";

export interface PromotionControllerModels {
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    promotions: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    suppliers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}