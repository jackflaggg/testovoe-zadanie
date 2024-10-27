import {createPromotionInterface, PromotionRepoInterface} from "../../models/promotion.repository.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata'
import {TYPES} from "../../utils/types/types";
import {PrismaService } from "../../db/db";
import {LoggerServiceInterface} from "../../models/logger.service.model";
import {PromotionModel} from "@prisma/client";

@injectable()
export class PromotionRepository implements PromotionRepoInterface  {
    constructor(@inject(TYPES.PrismaService) private prisma: PrismaService,
                @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface) {}
    async createPromotion(body: createPromotionInterface): Promise<PromotionModel | null> {
        try {
            return await this.prisma.client.promotionModel.create({
                data: body
            });
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время создания акции:', err);
            return null;
        }
    }

    async deletePromotion(id: number): Promise<PromotionModel | null> {
        try {
            return await this.prisma.client.promotionModel.delete({where: {id: id}});
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время удаления акции:', err);
            return null;
        }
    }

    async updatePromotion(body: {title: string, description: string}, idPromotion: number): Promise<PromotionModel | null> {
        try {
            return await this.prisma.client.promotionModel.update({where: { id: idPromotion }, data: body});
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время обновления акции:', err);
            return null;
        }
    }
}