import {PromotionQueryRepoInterface} from "../../models/promotion.query.repository.interface";
import {TYPES} from "../../utils/types/types";
import {inject, injectable} from "inversify";
import {PrismaService} from "../../db/db";

@injectable()
export class PromotionQueryRepository implements PromotionQueryRepoInterface {
    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

    async find(query: any) {

        const findPromotion = await this.prismaService.client.promotionModel.findFirst({where: {id: query.id}});
        if (!findPromotion) {
            return null;
        }
        return findPromotion;
    }

    async getAll() {
    }

}