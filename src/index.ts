import {App} from "./app";
import { Container, ContainerModule, interfaces } from "inversify"
import {TYPES} from "./utils/types/types";
import {LoggerService} from "./domain/logger.service";
import {LoggerServiceInterface} from "./models/logger.service.model";
import {PrismaService} from "./db/db";

export const appContainers = new ContainerModule((bind: interfaces.Bind): void => {
    bind<LoggerServiceInterface>(TYPES.LoggerServiceInterface).to(LoggerService).inSingletonScope();
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    bind<App>(TYPES.Application).to(App).inSingletonScope();
})

function bootstrap(): void {
    const container = new Container();
    container.load(appContainers);

    const app = container.get<App>(TYPES.Application);
    app.init()
}

bootstrap()