import {Settings} from "./settings";
import express, {Express} from 'express'
import {Server} from "http";
import cors from 'cors'
import {inject, injectable} from "inversify";
import 'reflect-metadata'
import {TYPES} from "./utils/types/types";
import {LoggerServiceInterface} from "./models/logger.service.model";
import {PrismaService} from "./db/db";
import {PromotionRepoInterface} from "./models/promotion.repository.interface";
import {PromotionQueryRepoInterface} from "./models/promotion.query.repository.interface";
import {PromotionController} from "./controllers/promotion.controller";
import {PromotionAdminServiceInterface} from "./models/admin.promotion.service.model";
import {HashServiceInterface} from "./models/hash.service.model";
import {BasicAuthMiddleware} from "./utils/middlewares/basic.auth.middleware";
import {ErrorsUnique} from "./utils/features/errors.unique";

@injectable()
export class App {
    private app: Express;
    private server: Server | undefined;
    public port: number;

    constructor(
        @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface,
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
        @inject(TYPES.PromotionController) private promotionController: PromotionController,
        @inject(TYPES.PromotionAdminService) private promotionAdminService: PromotionAdminServiceInterface,
        @inject(TYPES.UserRepository) private userRepository: PromotionRepoInterface,
        @inject(TYPES.UserQueryRepository) private userQueryRepository: PromotionQueryRepoInterface,
        @inject(TYPES.PromotionRepository) private promotionRepo: PromotionRepoInterface,
        @inject(TYPES.PromotionQueryRepository) private promotionQueryRepo: PromotionQueryRepoInterface,
        @inject(TYPES.HashServiceInterface) private hashService: HashServiceInterface,
        @inject(TYPES.BasicAuthMiddleware) private basicAuthMiddleware: BasicAuthMiddleware,
    ) {
        this.app = express();
        this.port = Number(Settings.port);
    }

    useMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    useRoutes(){
        this.app.use('/promotion', this.promotionController.router)
    }
    public async init () {
        this.useMiddleware();
        this.useRoutes();
        await this.prismaService.connect();
        this.server = this.app.listen(this.port, () => {
            console.log('Сервер запущен на ' + this.port + ' порту!')
        })
        this.logger.log();
    }
}