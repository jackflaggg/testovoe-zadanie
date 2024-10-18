import {NextFunction, Request, Response} from "express";

//интерфейс определяет структуру для middleware-функций
export interface MiddlewareInterface {
    //Определяет метод, который будет выполняться при обработке запроса
    execute: (req: Request, res: Response, next: NextFunction) => void;
}