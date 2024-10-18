import {PromotionQueryRepository} from "../../repository/promotion/promotion-query-repository";
import {PromotionRepository} from "../../repository/promotion/promotion-repository";

export const TYPES = {
    Application: Symbol.for("Application"),
    LoggerServiceInterface: Symbol.for("LoggerServiceInterface"),
    PromotionController: Symbol.for("PromotionController"),
    PrismaService: Symbol.for("PrismaService"),
    PromotionQueryRepository: Symbol.for("PromotionQueryRepository"),
    PromotionRepository: Symbol.for("PromotionRepository"),
}