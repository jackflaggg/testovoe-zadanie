import {BaseController} from "../models/base.controller.models";
import {inject, injectable} from "inversify";
import 'reflect-metadata'
import {TYPES} from "../utils/types/types";
import {LoggerServiceInterface} from "../models/logger.service.model";
import {NextFunction, Request, Response} from "express";
import {PromotionControllerModels} from "../models/promotion.controller.models";
import {ValidateMiddleware} from "../utils/middlewares/validate.middleware";
import {SuppliersRegisterDto} from "../validators/suppliers.register.dto";
import {queryHelperToPromotions} from "../utils/mapper/helper.query.get";
import {PromotionQueryRepoInterface} from "../models/promotion.query.repository.interface";
import {HTTP_STATUSES} from "../models/http-statuses.models";
import {BasicAuthMiddleware, ValMiddleToBasic} from "../utils/middlewares/basic.auth.middleware";
import {PromotionAdminService} from "../domain/promotion.admin.service";
import {Settings} from "../settings";
import {OutCreateSupplierErrors} from "../utils/features/outCreateSuuplier.errors";
import {UserQueryRepository} from "../repository/user/user-query-repository";

@injectable()
export class PromotionController extends BaseController implements PromotionControllerModels{
    constructor(
        @inject(TYPES.LoggerServiceInterface) private loggerService: LoggerServiceInterface,
        @inject(TYPES.PromotionAdminService) private promotionAdminService: PromotionAdminService,
        @inject(TYPES.PromotionQueryRepository) private promotionQueryRepository: PromotionQueryRepoInterface,
        @inject(TYPES.BasicAuthMiddleware) private basicAuthMiddleware: BasicAuthMiddleware,
        @inject(TYPES.UserQueryRepository) private userQueryRepository: UserQueryRepository
    ) {
        super(loggerService);
        this.bindRoutes([
            {
                path: '/admin/register',
                method: 'post',
                func: this.registerSuppliers,
                middlewares: [this.basicAuthMiddleware, new ValidateMiddleware(SuppliersRegisterDto)] },
            {
                path: '/admin/login',
                method: 'post',
                func: this.login,
                //TODO: Не прокидывается ошибка в мидлвэйр
                middlewares: [this.basicAuthMiddleware, new ValMiddleToBasic()] },
            {
                path: '/admin/promotions',
                method: 'get',
                func: this.promotions,
                middlewares: [new ValidateMiddleware(SuppliersRegisterDto)] },
        ])
    }

    async login (req: Request, res: Response, next: NextFunction) : Promise<void>{
        try {
            const [email, password] = Settings.admin.split(':');

            const auth = await this.promotionAdminService.loginAdmin(email, password)
            if (!auth){
                res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401)
                return;
            }

            res.status(HTTP_STATUSES.CREATED_201).send({msg: 'Успешная авторизация'})
            return;
        } catch (err: unknown){
            if (err instanceof Error){
                this.loggerService.log(err)
                return;
            }
            this.loggerService.error(err)
            return;
        }
    };
    async promotions (req: Request, res: Response, next: NextFunction): Promise<void>{
        const sortData = queryHelperToPromotions(req.query);
        const allPromotions = await this.promotionQueryRepository.getAll(sortData);
        this.ok(res, allPromotions);
    };
    async registerSuppliers (req: Request, res: Response, next: NextFunction) : Promise<void> {
        const {login, password} = req.body;

        const createdSupplier = await this.promotionAdminService.createSupplier(login, password);
        if (createdSupplier instanceof OutCreateSupplierErrors || !createdSupplier.data){
            this.loggerService.log('[promotionAdminService] в сервисе вернул непредвиденные данные');
            res
                .status(HTTP_STATUSES.BAD_REQUEST_400)
                .send(createdSupplier.extensions)
            return;
        }
        const supplier = await this.userQueryRepository.find(createdSupplier.data.email);
        if (!supplier){
            this.loggerService.log("[supplier] не был найден в репозитории");
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return
        }
        res.status(HTTP_STATUSES.CREATED_201).send(supplier);
        return;
    };
}