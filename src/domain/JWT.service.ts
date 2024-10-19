import {Settings} from "../settings";
import {secretErrorCheck} from "../utils/features/secret.error.feature";
import {inject} from "inversify";
import jwt, {JwtPayload} from "jsonwebtoken";
import {TYPES} from "../utils/types/types";
import {LoggerServiceInterface} from "../models/logger.service.model";

export class JWTService {
    constructor(@inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface) {}
    async createAnyToken(userId: string, expiresInData: string = Settings.tokenDuration){
        try {
            if (secretErrorCheck(Settings.secretKey)) return null;
            return jwt.sign({userId: userId}, Settings.secretKey, {expiresIn: expiresInData});
        } catch (err: unknown){
            this.logger.error(err);
            return null;
        }
    }

    async verifyRefreshToken(refreshToken: string){
        try {
            const decoded = jwt.verify(refreshToken, Settings.secretKey);
            return { token: decoded };
        } catch (err: unknown){
            if (err instanceof jwt.TokenExpiredError) {
                this.logger.error(err)
                return { expired: true };
            }
            return null
        }
    }

    async getUserIdByToken(token: string){
        try {
            const user = jwt.verify(token, Settings.secretKey);
            console.log(user);
            if (!user){
                this.logger.log('что то пошло не так при верификации токена ' + JSON.stringify(user))
                return null;
            }

            return user
        } catch (error: unknown){
            this.logger.error('я попал в блок catch , видимо что-то пошло не так при преобразовании!')

            if (error instanceof jwt.TokenExpiredError) {
                return null// { expired: true };
            }

            return null
        }
    }
}