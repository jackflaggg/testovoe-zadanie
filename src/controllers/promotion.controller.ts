import {BaseController} from "../models/base.controller.models";
import {inject, injectable} from "inversify";
import 'reflect-metadata'
import {TYPES} from "../utils/types/types";
import {LoggerServiceInterface} from "../models/logger.service.model";
import {NextFunction, Request, Response} from "express";
import {PromotionControllerModels} from "../models/promotion.controller.models";
import {ValidateMiddleware} from "../utils/middlewares/validate.middleware";
import {SupplierLoginDto} from "../validators/suppliers.login.dto";
import {SuppliersRegisterDto} from "../validators/suppliers.register.dto";

@injectable()
export class PromotionController extends BaseController implements PromotionControllerModels{
    constructor(
        @inject(TYPES.LoggerServiceInterface) private loggerService: LoggerServiceInterface,
    ) {
        super(loggerService);
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: (req: Request, Response: Response, next: NextFunction) => ({}),
                middlewares: [new ValidateMiddleware(SuppliersRegisterDto)] },
            {
                path: '/login',
                method: 'post',
                func: (req: Request, Response: Response, next: NextFunction)=> ({}),
                middlewares: [new ValidateMiddleware(SupplierLoginDto)] },
            {
                path: '/info',
                method: 'get',
                func: (req: Request, Response: Response, next: NextFunction)=> ({}),
                middlewares: [] },
        ])
    }
    async login (req: Request, res: Response, next: NextFunction) : Promise<void>{
        try {

        } catch (err: unknown){

        }
    };
    async promotions (): Promise<void>{};
    async suppliers () : Promise<void> {};
}