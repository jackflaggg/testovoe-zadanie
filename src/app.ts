import {Settings} from "./settings";
import express, {Express} from 'express'
import {Server} from "http";
import cors from 'cors'

// const prisma = new PrismaClient();

export class App {
    private app: Express;
    private server: Server | undefined;
    public port: number;

    constructor() {
        this.app = express();
        this.port = Number(Settings.port);
    }

    useMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    useRoutes(){
        this.app.use('/', this.useRoutes)
    }
    public async init () {
        this.useMiddleware();
        this.useRoutes();
        // const db = await prisma.$connect();
        this.server = this.app.listen(this.port, () => {
            console.log('Сервер запущен на ' + this.port + ' порту!')
        })
    }
}