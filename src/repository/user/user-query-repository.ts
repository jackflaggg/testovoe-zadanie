import {inject, injectable} from "inversify";
import {TYPES} from "../../utils/types/types";
import {PrismaService} from "../../db/db";
import {LoggerServiceInterface} from "../../models/logger.service.model";
import {UserQueryRepoInterface} from "../../models/promotion.query.repository.interface";
import {queryHelperToPromotion} from "../../utils/mapper/InQueryPromotion.mapper";
import {UserModel} from "@prisma/client";
import {queryPromoInterface} from "../../utils/mapper/helper.query.get";

@injectable()
export class UserQueryRepository implements UserQueryRepoInterface {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService,
                @inject(TYPES.LoggerServiceInterface) private logger: LoggerServiceInterface) {}
    async findId( id: number): Promise<UserModel | null> {
        try {
            return await this.prismaService.client.userModel.findFirst({where: {id}});
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время поиска юзера:', err);
            return null;
        }
    }

    async getAll(queryParamsTo: queryPromoInterface) {
        const {searchNameTerm, sortBy, sortDirection, cursor, pageSize} = queryHelperToPromotion(queryParamsTo);
        try {
            const promotions = await this.prismaService.client.userModel.findMany({
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
                items: items.map(blog => (blog)), // Маппинг данных
            };
        } catch (err: unknown){
            this.logger.error('Возникла ошибка во время получения всех юзеров:', err);
            return null;
        }
    }

    async findByEmailSupplier(email: string): Promise<UserModel | null> {
        try {
            const searchEmail = await this.prismaService.client.userModel.findFirst({where: {email}});
            if (!searchEmail || !searchEmail.id) {
                return null;
            }
            return searchEmail
        } catch(err: unknown){
            this.logger.error('Возникла ошибка во время получения всех юзеров:', err);
            return null;
        }
    }
}