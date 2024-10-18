import {NextFunction, Request, Response, Router} from "express";
import {MiddlewareInterface} from "./middleware.interface";

export interface IControllerRoute {
    path: string;
    func: (req: Request, Response: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
    middlewares?: MiddlewareInterface[]
}
