import {BaseController} from "../models/base.controller.models";
import {inject, injectable} from "inversify";
import 'reflect-metadata'
import {TYPES} from "../utils/types/types";
import {LoggerServiceInterface} from "../models/logger.service.model";
import {NextFunction, Request, Response} from "express";
import {PromotionControllerModels} from "../models/promotion.controller.models";
import {ValidateMiddleware} from "../utils/middlewares/validate.middleware";
import {
    SuppliersRegisterUserDto,
    SupplierUpdateUserDto
} from "../validators/suppliers.register.dto";
import {queryHelperToPromotions} from "../utils/mapper/helper.query.get";
import {PromotionQueryRepoInterface} from "../models/promotion.query.repository.interface";
import {HTTP_STATUSES} from "../models/http-statuses.models";
import {BasicAuthMiddleware, ValMiddleToBasic} from "../utils/middlewares/basic.auth.middleware";
import {PromotionAdminService} from "../domain/promotion.admin.service";
import {Settings} from "../settings";
import {OutCreateSupplierErrors} from "../utils/features/outCreateSuuplier.errors";
import {UserQueryRepository} from "../repository/user/user-query-repository";
import {PromotionsCreateDto, PromotionsUpdateDto} from "../validators/promotions.dto";

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
                middlewares: [this.basicAuthMiddleware, new ValidateMiddleware(SuppliersRegisterUserDto)] },
            {
                path: '/admin/login',
                method: 'post',
                func: this.loginAdmin,
                //TODO: Не прокидывается ошибка в мидлвэйр
                middlewares: [this.basicAuthMiddleware, new ValMiddleToBasic()] },
            {
                path: '/admin/promotions',
                method: 'get',
                func: this.promotions,
                middlewares: [this.basicAuthMiddleware] },
            {
                path: '/admin/supplier/:id',
                method: 'put',
                func: this.updateSuppliers,
                middlewares: [this.basicAuthMiddleware, new ValidateMiddleware(SupplierUpdateUserDto)]
            },
            {
                path: '/admin/supplier/:id',
                method: 'delete',
                func: this.deleteSuppliers,
                middlewares: [this.basicAuthMiddleware]
            },
            {
                path: '/admin/promotions',
                method: 'post',
                func: this.createPromotion,
                middlewares: [this.basicAuthMiddleware, new ValidateMiddleware(PromotionsCreateDto)] },
            {
                path: '/admin/promotions/:id',
                method: 'put',
                func: this.updatePromotion,
                middlewares: [this.basicAuthMiddleware, new ValidateMiddleware(PromotionsUpdateDto)]
            },
            {
                path: '/admin/promotions/:id',
                method: 'delete',
                func: this.deletePromotion,
                middlewares: [this.basicAuthMiddleware]
            },
            ///////////
            {
                path: '/promotion/login',
                method: 'post',
                func: this.loginSupplier,
                middlewares: [this.basicAuthMiddleware]
            },
            {
                path: '/promotion/refresh-token',
                method: 'post',
                func: this.refreshToken,
                middlewares: [this.basicAuthMiddleware]
            },
        ])
    }

    async loginAdmin (req: Request, res: Response, next: NextFunction) : Promise<void>{
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
        const {email, password} = req.body;
        const createdSupplier = await this.promotionAdminService.createSupplier(email, password);

        if (createdSupplier instanceof OutCreateSupplierErrors || !createdSupplier.data){
            this.loggerService.log('[promotionAdminService] в сервисе вернул непредвиденные данные');
            res
                .sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return;
        }
        const supplier = await this.userQueryRepository.findByEmailSupplier(String(createdSupplier.data));
        if (!supplier){
            this.loggerService.log("[supplier] не был найден в репозитории");
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return
        }
        res.status(HTTP_STATUSES.CREATED_201).send(supplier);
        return;
    };
    async updateSuppliers (req: Request, res: Response, next: NextFunction) : Promise<void> {
        const { password } = req.body;
        const { id } = req.params;

        if (!id){
            this.loggerService.log('[userError] забыли ввести данные');
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return
        }

        const existingSupplier = await this.userQueryRepository.findId(Number(id));

        if (!existingSupplier) {
            this.loggerService.log('[userQueryRepository] не существует юзера')
            res.status(HTTP_STATUSES.NOT_FOUND_404).send({data: null});
            return;
        }

        const updateSupplier = await this.promotionAdminService.updatePasswordSupplier(id, password);
        if (!updateSupplier){
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return
        }
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
        return

    };
    async deleteSuppliers (req: Request, res: Response, next: NextFunction) : Promise<void> {
        if (!req.params.id){
            this.loggerService.log('[userError] забыли ввести данные');
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }

        const existingSupplier = await this.userQueryRepository.findId(Number(req.params.id));
        if (!existingSupplier) {
            this.loggerService.log('[userQueryRepository] не существует юзера')
            res.status(HTTP_STATUSES.NOT_FOUND_404).send({data: null});
            return;
        }

        const deleteSupplier = await this.promotionAdminService.deleteSupplier(req.params.id);
        if (!deleteSupplier){
            this.loggerService.log('[userRepository] произошла ошибка при удалении юзера')
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({data: null});
            return;
        }
        res.status(HTTP_STATUSES.CREATED_201).send(deleteSupplier);
        return
    };
    async createPromotion (req: Request, res: Response, next: NextFunction) : Promise<void>{
        const {title, description} = req.body;
        const adminId = await this.userQueryRepository.findByEmailSupplier(Settings.admin.split(':')[0]);

        if (!adminId){
            this.loggerService.log("[admin] не был найден в репозитории");
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return
        }

        const createdPromotion = await this.promotionAdminService.createPromotion(title, description, String(adminId.id));
        if (!createdPromotion){
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return
        }
        const newPromotion = await this.userQueryRepository.findId(createdPromotion.id);
        if (!newPromotion){
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        res.status(HTTP_STATUSES.CREATED_201).send({data: newPromotion});
        return;
    };
    async deletePromotion (req: Request, res: Response, next: NextFunction) : Promise<void>{
        const {id} = req.params;
        if (!id){
            this.loggerService.log('[userError] вы забыли указать данные')
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const existingPromotion = await this.promotionQueryRepository.findPromotion(Number(id));
        if (!existingPromotion){
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return
        }
        const deletePromotion = await this.promotionAdminService.deletePromotion(+existingPromotion.id);
    };
    async updatePromotion (req: Request, res: Response, next: NextFunction) : Promise<void>{
        const {title, description} = req.body;
        const {id} = req.params;

        const existingPromotion = await this.promotionQueryRepository.findPromotion(Number(id));
        if (!existingPromotion) {
            res.status(HTTP_STATUSES.NOT_FOUND_404).send({data: null});
            return;
        }
        const updatedPromotion = await this.promotionAdminService.updatePromotion(title, description, String(id));
        if (!updatedPromotion){
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({data: null});
            return;
        }
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        return;
    };
    async loginSupplier (req: Request, res: Response, next: NextFunction) : Promise<void>{
        const { email, password } = req.body;
        const existingUser = await this.userQueryRepository.findByEmailSupplier(email);

        if (!existingUser){
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }

        const loginUser = await this.promotionAdminService.loginUser(email, password);
        if(!loginUser){
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }
        res.cookie('refreshToken', loginUser.refreshToken);
        res.status(HTTP_STATUSES.OK_200).send({jwtToken: loginUser.jwtToken})
    };
    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>{};
}