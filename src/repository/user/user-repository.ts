import {PromotionRepoInterface} from "../../models/promotion.repository.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../../utils/types/types";
import {PrismaService} from "../../db/db";
import {LoggerServiceInterface} from "../../models/logger.service.model";

@injectable()
export class UserRepository implements PromotionRepoInterface {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService,
                @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface) {}
    async create(body: any)  {
        try {
            return await this.prismaService.client.userModel.create({
                data: body
            });
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время создания акции:', err);
            return null;
        }
    }
    async update(body: any, idPromotion: number) {
        try {
            return await this.prismaService.client.userModel.create({
                data: body
            });
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время создания акции:', err);
            return null;
        }
    }
    async delete(id: number) {
        try {
            return await this.prismaService.client.userModel.create({
                data: id
            });
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время создания акции:', err);
            return null;
        }
    }
}