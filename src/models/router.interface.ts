import {NextFunction, Request, Response} from "express";

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface RouterInterface {
    method: HttpMethod,
    path: string,
    handler: (req: Request, res: Response, next: NextFunction) => void
}