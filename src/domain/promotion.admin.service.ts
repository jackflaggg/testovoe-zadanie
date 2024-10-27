import {UserQueryRepository} from "../repository/user/user-query-repository";
import {PromotionAdminServiceInterface} from "../models/admin.promotion.service.model";
import {inject, injectable} from "inversify";
import {TYPES} from "../utils/types/types";
import {HashServiceInterface} from "../models/hash.service.model";
import {UserRepository} from "../repository/user/user-repository";
import {errUnique} from "../models/err-unique-interface";
import {LoggerService} from "./logger.service";
import {createPromotionInterface, PromotionRepoInterface} from "../models/promotion.repository.interface";

@injectable()
export class PromotionAdminService implements PromotionAdminServiceInterface{
    constructor(@inject(TYPES.UserQueryRepository) private userQueryRepository: UserQueryRepository,
                @inject(TYPES.HashServiceInterface) private hashService: HashServiceInterface,
                @inject(TYPES.ErrorsUnique) private errorsUnique: errUnique,
                @inject(TYPES.UserRepository) private userRepository: UserRepository,
                @inject(TYPES.LoggerServiceInterface) private loggerService: LoggerService,
                @inject(TYPES.PromotionRepository) private promotionRepo: PromotionRepoInterface,) {}

    async loginAdmin(email: string, password: string) {

        const credentialLoginOrEmail = await this.userQueryRepository.findByEmailSupplier(email);

        if (!credentialLoginOrEmail) {
            return null
        }

        return await this.hashService.comparePassword(password, credentialLoginOrEmail.password);
    }
    async createPromotion(title: string, description: string, supplierId: string): Promise<any> {
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
    async deletePromotion(id: string): Promise<void> {}

    async createSupplier(email: string, password: string) {
        const uniqueErrors = await this.errorsUnique.checkUnique(email);
        console.log(uniqueErrors)
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
    async updatePromotion(title: string, description: string, promotionId: string): Promise<any> {
        const upPromotion = await this.promotionRepo.updatePromotion({title, description}, Number(promotionId));
        if (!upPromotion) {
            return null
        }
        return upPromotion;
    }
    async updatePasswordSupplier(id: string, password: string): Promise<any> {

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
    async deleteSupplier(id: string): Promise<any> {
        return await this.userRepository.deleteUser(Number(id));
    }
    async statusPromoToSupplier(id: string): Promise<void> {}
}