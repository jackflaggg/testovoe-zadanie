import {NextFunction, Request, Response} from "express";

//интерфейс определяет структуру для middleware-функций
export interface MiddlewareInterface {
    execute: (req: Request, res: Response, next: NextFunction) => void;
}