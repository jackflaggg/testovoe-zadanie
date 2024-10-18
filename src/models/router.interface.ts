import {NextFunction, Request, Response, Router} from "express";
import {MiddlewareInterface} from "./middleware.interface";

export interface IControllerRoute {
    // путь маршрута
    path: string;
    // функция, которая будет обрабатывать запросы по этому маршруту
    func: (req: Request, Response: Response, next: NextFunction) => void;
    //HTTP-метод
    method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
    //массив middleware функций, которые должны быть применены к этому маршруту
    middlewares?: MiddlewareInterface[]
}
