import {PromotionQueryRepoInterface} from "../../models/promotion.query.repository.interface";
import {TYPES} from "../../utils/types/types";
import {inject, injectable} from "inversify";
import 'reflect-metadata'
import {PrismaService} from "../../db/db";
import {LoggerServiceInterface} from "../../models/logger.service.model";
import {queryHelperToPromotion} from "../../utils/mapper/InQueryPromotion.mapper";

@injectable()
export class PromotionQueryRepository {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService,
                @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface) {}

    async find(id: number) {
        try {
            return await this.prismaService.client.promotionModel.findFirst({where: {id}});
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время создания акции:', err);
            return null;
        }
    }

    async getAll(queryParamsTo: any) {
        const {searchNameTerm, sortBy, sortDirection, cursor, pageSize} = queryHelperToPromotion(queryParamsTo);
        try {
            const whereClause = searchNameTerm ? {
                title: {
                    contains: searchNameTerm,
                    mode: 'insensitive' as 'insensitive'
                }
            } : {};

            const promotions = await this.prismaService.client.promotionModel.findMany({
                where: whereClause,
                orderBy: {
                    [sortBy]: sortDirection
                },
                take: pageSize + 1,
                cursor: cursor ? { id: cursor } : undefined
            });
            const hasMore = promotions.length > pageSize;
            const items = hasMore ? promotions.slice(0, -1) : promotions; // Убираем последний элемент, если есть следующая страница
            const nextCursor = hasMore ? items[items.length - 1].id : null; // Устанавливаем следующий курсор
            return {
                nextCursor,
                items: items.map(({id, updatedAt, ...blog}) => blog), // Маппинг данных
            };
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время создания акции:', err);
            return null;
        }
    }
}