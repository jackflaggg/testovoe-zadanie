import {MiddlewareInterface} from "../../models/middleware.interface";
import {Request, Response, NextFunction} from "express";
import {HTTP_STATUSES} from "../../models/http-statuses.models";
import {fromUTF8ToBase64} from "../features/UTF8ToBase64";
import {Settings} from "../../settings";

export class AdminMiddleware implements MiddlewareInterface{
    execute(req: Request, res: Response, next:NextFunction) {
        const {authorization: auth} = req.headers;

        if (!auth || !auth?.startsWith('Basic')){
            console.log(`[auth] ошибка в авторизации в заголовках`);
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }

        const codedAuth = fromUTF8ToBase64(Settings.admin);
        if (auth.slice(6) !== (codedAuth)){
            console.log(`[codedAuthorization] ошибка в декодировании`);
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }
        next()
    }
}