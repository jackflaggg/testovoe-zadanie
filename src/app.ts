import {Settings} from "./settings";
import express, {Express} from 'express'
import {Server} from "http";
import cors from 'cors'
import {inject, injectable} from "inversify";
import 'reflect-metadata'
import {TYPES} from "./utils/types/types";
import {LoggerServiceInterface} from "./models/logger.service.model";
import {PrismaService} from "./db/db";

// const prisma = new PrismaClient();
@injectable()
export class App {
    private app: Express;
    private server: Server | undefined;
    public port: number;

    constructor(
        @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface,
        @inject(TYPES.PrismaService) private prismaService: PrismaService
    ) {
        this.app = express();
        this.port = Number(Settings.port);
    }

    useMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    useRoutes(){
        this.app.use('/promotion', this.useRoutes)
    }
    public async init () {
        this.useMiddleware();
        this.useRoutes();
        const db = await this.prismaService.connect();
        this.server = this.app.listen(this.port, () => {
            console.log('Сервер запущен на ' + this.port + ' порту!')
        })
        this.logger.log();
    }
}