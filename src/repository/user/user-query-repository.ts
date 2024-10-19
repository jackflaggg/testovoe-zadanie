import {inject, injectable} from "inversify";
import {TYPES} from "../../utils/types/types";
import {PrismaService} from "../../db/db";
import {LoggerServiceInterface} from "../../models/logger.service.model";
import {PromotionQueryRepoInterface} from "../../models/promotion.query.repository.interface";
import {queryHelperToPromotion} from "../../utils/mapper/InQueryPromotion.mapper";
import {InAdminModel} from "../../models/admin-model";

@injectable()
export class UserQueryRepository implements PromotionQueryRepoInterface {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService,
                @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface) {}
    async find(body: InAdminModel) {
        const {email, password} = body;
        try {
            return await this.prismaService.client.userModel.findFirst({where: {email}});
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время поиска юзера:', err);
            return null;
        }
    }

    async getAll(queryParamsTo: any) {
    //     const {searchNameTerm, sortBy, sortDirection, cursor, pageSize} = queryHelperToPromotion(queryParamsTo);
    //     try {
    //         const whereClause = searchNameTerm ? {
    //             title: {
    //                 contains: searchNameTerm,
    //                 mode: 'insensitive' as 'insensitive'
    //             }
    //         } : {};
    //
    //         const promotions = await this.prismaService.client.userModel.findMany({
    //             where: whereClause,
    //             orderBy: {
    //                 [sortBy]: sortDirection
    //             },
    //             take: pageSize + 1,
    //             cursor: cursor ? { id: cursor } : undefined
    //         });
    //         const hasMore = promotions.length > pageSize;
    //         const items = hasMore ? promotions.slice(0, -1) : promotions; // Убираем последний элемент, если есть следующая страница
    //         const nextCursor = hasMore ? items[items.length - 1].id : null; // Устанавливаем следующий курсор
    //         return {
    //             nextCursor,
    //             items: items.map(blog => (blog)), // Маппинг данных
    //         };
    //     } catch (err: unknown){
    //         this.logger.error('Возникла ошибка во время получения всех юзеров:', err);
    //         return null;
    //     }
    }
}