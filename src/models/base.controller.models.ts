import {Router, Response} from "express";
import {LoggerServiceInterface} from "./logger.service.model";
import {HTTP_STATUSES} from "./http-statuses.models";
import {IControllerRoute} from "./router.interface";
import {injectable} from "inversify";
import "reflect-metadata"

@injectable()
export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: LoggerServiceInterface){
        this._router = Router();
    }

    public get router(){
        return this._router;
    }

    public ok<T>(res: Response, msg: T){
        return this.send<T>(res, HTTP_STATUSES.OK_200, msg);
    }
    public create(res: Response){
        return res.sendStatus(HTTP_STATUSES.CREATED_201);
    }
    public update<T>(res: Response, msg: T){
        return res.status(HTTP_STATUSES.NO_CONTENT_204).send(msg);
    }
    public delete(res: Response){
        return res.status(HTTP_STATUSES.NO_CONTENT_204);
    }
    public noAuth<T>(res: Response, msg: T){
        return this.send<T>(res, HTTP_STATUSES.NOT_AUTHORIZATION_401, msg)
    }
    public send<T>(res: Response, code: number, msg: T){
        return res
            .status(code)
            .send(msg);
    }
// Этот метод связывает маршруты с их обработчиками и middleware
    protected bindRoutes(routes: IControllerRoute[]){
        for (const route of routes){
            this.logger.log(`[${route.method}] ${route.path}`);
            //есть ли middleware для текущего маршрута. Если есть, он создает новый массив,
            //где каждая middleware-функция связана с контекстом экземпляра класса
            const middleware = route.middlewares?.map(elem => elem.execute.bind(elem));
            // обработчик маршрута также связывается с контекстом текущего класса
            const handler = route.func.bind(this);
            const pipeline = middleware ? [...middleware, handler] : handler;
            this.router[route.method](route.path, pipeline);
        }
    }
}