import {MiddlewareInterface} from "../../models/middleware.interface";
import {NextFunction, Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/http-statuses.models";
import {validationResult} from "express-validator";
import {fromBase64ToUTF8, fromUTF8ToBase64} from "../features/UTF8ToBase64";
import {inject, injectable} from "inversify";
import {TYPES} from "../types/types";
import {UserQueryRepository} from "../../repository/user/user-query-repository";
import {LoggerService} from "../../domain/logger.service";
import {Settings} from "../../settings";

export class ValMiddleToBasic implements MiddlewareInterface {
    execute(req: Request, res: Response, next:NextFunction) {
        const errors = validationResult(req.headers);
        if (!errors.isEmpty()) {
            const errorsArray = errors.array({ onlyFirstError: true}) as Record<string, string>[]/*{ path: string, msg: string}[]*/;
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({errors: errorsArray});
            return
        }

        next()
    }
}
@injectable()
export class BasicAuthMiddleware implements MiddlewareInterface {
    constructor(@inject(TYPES.UserQueryRepository) private readonly userQueryRepository: UserQueryRepository,
                @inject(TYPES.LoggerServiceInterface) private loggerService: LoggerService,) {
    }
    async execute(req: Request, res: Response, next:NextFunction) {
        const {authorization: auth} = req.headers;

        const basic = req.headers.authorization!.split(' ')[1];

        if (!auth || !auth?.startsWith('Basic')){
            this.loggerService.log(`[auth] ошибка в авторизации в заголовках`);
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }

        const adminEmail = fromUTF8ToBase64(Settings.admin);

        if (auth.slice(6) !== adminEmail){
            this.loggerService.log('[codedAuthorization] ошибка в декодировании');
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }
        // console.log(fromUTF8ToBase64(auth.slice(6)))
        // const credEmail = await this.userQueryRepository.find(adminEmail);
        //
        // if (!credEmail){
        //     this.loggerService.log(`[userQueryRepository] ошибка в поиске бд`);
        //     res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
        //     return;
        // }
        // req.body = credEmail;
        next()
    }
}