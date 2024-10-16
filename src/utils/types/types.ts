import {PromotionQueryRepoInterface} from "../../models/promotion.query.repository.interface";
import {PromotionRepoInterface} from "../../models/promotion.repository.interface";

export const TYPES = {
    Application: Symbol.for("Application"),
    LoggerServiceInterface: Symbol.for("LoggerServiceInterface"),
    PrismaService: Symbol.for("PrismaService"),
    PromotionQueryRepoInterface: Symbol.for("PromotionQueryRepoInterface"),
    PromotionRepoInterface: Symbol.for("PromotionRepoInterface"),
}