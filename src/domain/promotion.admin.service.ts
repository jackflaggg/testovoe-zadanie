import {InAdminModel} from "../models/admin-model";
import {UserQueryRepository} from "../repository/user/user-query-repository";
import {PromotionAdminServiceInterface} from "../models/admin.promotion.service.model";
import {inject, injectable} from "inversify";
import {TYPES} from "../utils/types/types";

@injectable()
export class PromotionAdminService implements PromotionAdminServiceInterface{
    constructor(@inject(TYPES.UserQueryRepository) private userQueryRepository: UserQueryRepository) {}

    async loginAdmin(body: InAdminModel) {
        const findAdmin = await this.userQueryRepository.find(body);
        return findAdmin;
    }
    async createPromotion(): Promise<void> {}
    // получение всех акций из репозитория
    async deletePromotion(id: string): Promise<void> {}
    async updatePromotion(id: string): Promise<void> {}
    async createSupplier(): Promise<void> {}
    async updatePasswordSupplier(): Promise<void> {}
    async deleteSupplier(id: string): Promise<void> {}
    async statusPromoToSupplier(id: string): Promise<void> {}
}