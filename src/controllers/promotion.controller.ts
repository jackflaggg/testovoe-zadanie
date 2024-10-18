import {BaseController} from "../models/base.controller.models";
import {inject, injectable} from "inversify";
import 'reflect-metadata'
import {TYPES} from "../utils/types/types";
import {LoggerServiceInterface} from "../models/logger.service.model";
import {NextFunction, Request, Response} from "express";
import {PromotionControllerModels} from "../models/promotion.controller.models";

@injectable()
export class PromotionController extends BaseController implements PromotionControllerModels{
    constructor(
        @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface,
    ) {
        super(logger);
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: (req: Request, Response: Response, next: NextFunction) => ({}),
                middlewares: [] },
            {
                path: '/login',
                method: 'post',
                func: (req: Request, Response: Response, next: NextFunction)=> ({}),
                middlewares: [] },
            {
                path: '/info',
                method: 'get',
                func: (req: Request, Response: Response, next: NextFunction)=> ({}),
                middlewares: [] },
        ])
    }
    async login () : Promise<void>{};
    async promotions (): Promise<void>{};
    async suppliers () : Promise<void> {};
}