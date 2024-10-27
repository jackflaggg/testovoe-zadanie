import {UserQueryRepository} from "../repository/user/user-query-repository";
import {PromotionAdminServiceInterface} from "../models/admin.promotion.service.model";
import {inject, injectable} from "inversify";
import {TYPES} from "../utils/types/types";
import {HashServiceInterface} from "../models/hash.service.model";
import {UserRepository} from "../repository/user/user-repository";
import {errUnique} from "../models/err-unique-interface";
import {LoggerService} from "./logger.service";
import {createPromotionInterface, PromotionRepoInterface} from "../models/promotion.repository.interface";
import {JWTService} from "./JWT.service";
import {PromotionModel, UserModel} from "@prisma/client";
import {ErrorCreate, SuccessCreate} from "../models/create.supplier.models";

@injectable()
export class PromotionAdminService implements PromotionAdminServiceInterface{
    constructor(@inject(TYPES.UserQueryRepository) private userQueryRepository: UserQueryRepository,
                @inject(TYPES.HashServiceInterface) private hashService: HashServiceInterface,
                @inject(TYPES.ErrorsUnique) private errorsUnique: errUnique,
                @inject(TYPES.UserRepository) private userRepository: UserRepository,
                @inject(TYPES.LoggerServiceInterface) private loggerService: LoggerService,
                @inject(TYPES.PromotionRepository) private promotionRepo: PromotionRepoInterface,
                @inject(TYPES.JWTService) private jwtService: JWTService,) {}

    async loginAdmin(email: string, password: string): Promise<boolean | null> {

        const credentialLoginOrEmail = await this.userQueryRepository.findByEmailSupplier(email);

        if (!credentialLoginOrEmail) {
            return null
        }

        return await this.hashService.comparePassword(password, credentialLoginOrEmail.password);
    }
    async createPromotion(title: string, description: string, supplierId: string): Promise<PromotionModel | null> {
        const body: createPromotionInterface = {
            title,
            description,
            published: true,
            status: "APPROVED",
            supplier: {
                connect: { id : Number(supplierId) },
            }
        }
        const promotion = await this.promotionRepo.createPromotion(body);
        if (!promotion) {
            this.loggerService.error('Возникла ошибка во время создания акции')
            return null;
        }
        return promotion

    }
    // получение всех акций из репозитория
    async deletePromotion(id: number): Promise<PromotionModel | null> {
        const delPromo =  await this.promotionRepo.deletePromotion(id);
        if (!delPromo) {
            return null;
        }
        return delPromo
    }

    async createSupplier(email: string, password: string): Promise<ErrorCreate | SuccessCreate> {
        const uniqueErrors = await this.errorsUnique.checkUnique(email);

        if (uniqueErrors) {
            return {
                status: 'BadRequest',
                extensions: uniqueErrors,
                data: null
            };
        }

        const passwordHash = await this.hashService._generateHash(password);
        if (!passwordHash){
            return {
                status: 'BadRequest',
                extensions: passwordHash,
                data: null
            };
        }
        const newSupplier = {
            email,
            password: passwordHash,
            role: 'SUPPLIER',
        }

        const createUser = await this.userRepository.createUser(newSupplier);
        if (!createUser) {
            return {
                status: 'BadRequest',
                extensions: createUser,
                data: null
            };
        }
        return {
            status: 'Success',
            data: createUser
        };

    }
    async updatePromotion(title: string, description: string, promotionId: string): Promise<PromotionModel | null> {
        const upPromotion = await this.promotionRepo.updatePromotion({title, description}, Number(promotionId));
        if (!upPromotion) {
            return null
        }
        return upPromotion;
    }
    async updatePasswordSupplier(id: string, password: string): Promise<UserModel | null> {

        const hashPassword = await this.hashService._generateHash(password);

        if (!hashPassword) {
            this.loggerService.log('[hashService] ошибка при хэшировании')
            return null;
        }

        const compareHashAndPassword = await this.hashService.comparePassword(password, hashPassword);

        if (!compareHashAndPassword) {
            this.loggerService.log('[hashService] ошибка при перепроверке паролей')
            return null;
        }

        const updateUser = await this.userRepository.updateUser(hashPassword, Number(id));

        if (!updateUser) {
            this.loggerService.log('[userRepository] непредвиденная ошибка на стороне сервера при обнове данных');
            return null;
        }

        return updateUser;
    }
    async deleteSupplier(id: string): Promise<UserModel | null> {
        return await this.userRepository.deleteUser(Number(id));
    }
    async loginUser(email: string, password: string): Promise<{jwtToken: string, refreshToken: string} | null> {
        const hashPassword = await this.hashService._generateHash(password);

        if (!hashPassword) {
            return null
        }

        const comparePassword = await this.hashService.comparePassword(password, hashPassword);
        if (!comparePassword) {
            return null
        }

        const user = await this.userQueryRepository.findByEmailSupplier(email);

        const jwt = await this.jwtService.createAnyToken(String(user!.id));
        const refresh = await this.jwtService.createAnyToken(String(user!.id))
        if (!jwt || !refresh) {
            return null
        }
        return {jwtToken: jwt, refreshToken: refresh};
    }
}