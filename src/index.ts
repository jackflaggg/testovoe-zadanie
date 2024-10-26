import {App} from "./app";
import {Container, ContainerModule, interfaces} from "inversify"
import {TYPES} from "./utils/types/types";
import {LoggerService} from "./domain/logger.service";
import {LoggerServiceInterface} from "./models/logger.service.model";
import {PrismaService} from "./db/db";
import {PromotionController} from "./controllers/promotion.controller";
import {PromotionControllerModels} from "./models/promotion.controller.models";
import {PromotionQueryRepository} from "./repository/promotion/promotion-query-repository";
import {PromotionQueryRepoInterface} from "./models/promotion.query.repository.interface";
import {PromotionRepoInterface} from "./models/promotion.repository.interface";
import {PromotionRepository} from "./repository/promotion/promotion-repository";
import {UserRepository} from "./repository/user/user-repository";
import {UserQueryRepository} from "./repository/user/user-query-repository";
import {PromotionAdminService} from "./domain/promotion.admin.service";
import {PromotionAdminServiceInterface} from "./models/admin.promotion.service.model";
import {HashServiceInterface} from "./models/hash.service.model";
import {HashService} from "./domain/hash.service";

export const appContainers = new ContainerModule((bind: interfaces.Bind): void => {
    bind<LoggerServiceInterface>(TYPES.LoggerServiceInterface).to(LoggerService).inSingletonScope();
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    bind<PromotionControllerModels>(TYPES.PromotionController).to(PromotionController).inSingletonScope();
    bind<PromotionAdminServiceInterface>(TYPES.PromotionAdminService).to(PromotionAdminService).inSingletonScope();
    bind<PromotionRepoInterface>(TYPES.PromotionRepository).to(PromotionRepository).inSingletonScope();
    bind<HashServiceInterface>(TYPES.HashServiceInterface).to(HashService).inSingletonScope();
    bind<PromotionRepoInterface>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
    bind<PromotionQueryRepoInterface>(TYPES.UserQueryRepository).to(UserQueryRepository).inSingletonScope();
    bind<PromotionQueryRepoInterface>(TYPES.PromotionQueryRepository).to(PromotionQueryRepository).inSingletonScope();
    bind<App>(TYPES.Application).to(App).inSingletonScope();
})

function bootstrap(): void {
    const container = new Container();
    container.load(appContainers);

    const app = container.get<App>(TYPES.Application);
    app.init()
}

bootstrap()