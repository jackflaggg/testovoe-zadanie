import {inject, injectable} from "inversify";
import {TYPES} from "../types/types";
import {UserQueryRepository} from "../../repository/user/user-query-repository";
import {LoggerService} from "../../domain/logger.service";
import {NextFunction, Request, Response} from "express";
import {HTTP_STATUSES} from "../../models/http-statuses.models";
import {JWTService} from "../../domain/JWT.service";

@injectable()
export class AuthBearerMiddleware {
    constructor(@inject(TYPES.UserQueryRepository) private readonly userQueryRepository: UserQueryRepository,
                @inject(TYPES.LoggerServiceInterface) private loggerService: LoggerService,
                @inject(TYPES.JWTService) private jwtService: JWTService,) {
    }
    async execute(req: Request, res: Response, next:NextFunction) {
        const {authorization: auth} = req.headers;

        if (!auth){
            this.loggerService.log(`[auth] ошибка в авторизации в заголовках`);
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }

        const token = auth.split(' ')[1];

        const existingUserId = await this.jwtService.getUserIdByToken(token);

        if (!existingUserId){
            this.loggerService.log(`[jwtService] проблема с айди пользователем, мб невалиден`);
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }

        const supplier = await this.userQueryRepository.findId(Number(existingUserId));
        if (!supplier){
            this.loggerService.log(`[userQueryRepository] пользователь не найден`);
            res.sendStatus(HTTP_STATUSES.NOT_AUTHORIZATION_401);
            return;
        }
        req.userId = supplier.id;
        next()
    }
}