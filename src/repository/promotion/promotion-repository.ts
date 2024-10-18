import {PromotionRepoInterface} from "../../models/promotion.repository.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata'
import {TYPES} from "../../utils/types/types";
import {PrismaService } from "../../db/db";
import {LoggerServiceInterface} from "../../models/logger.service.model";

//TODO: Вернуться и дотипизировать ответы
@injectable()
export class PromotionRepository implements PromotionRepoInterface  {
    constructor(@inject(TYPES.PrismaService) private prisma: PrismaService,
                @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface) {}
    async create(body: any) {
        try {
            return await this.prisma.client.promotionModel.create({
                data: body
            });
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время создания акции:', err);
            return null;
        }
    }

    async delete(id: number) {
        try {
            return await this.prisma.client.promotionModel.delete({where: {id: id}});
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время удаления акции:', err);
            return null;
        }
    }

    async update(body: any, idPromotion: number) {
        try {
            return await this.prisma.client.promotionModel.update({where: { id: idPromotion }, data: body});
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время удаления акции:', err);
            return null;
        }
    }
}