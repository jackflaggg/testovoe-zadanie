import {AuthBearerMiddleware} from "../middlewares/auth.bearer.middleware";

export const TYPES = {
    Application: Symbol.for("Application"),
    LoggerServiceInterface: Symbol.for("LoggerServiceInterface"),
    PromotionController: Symbol.for("PromotionController"),
    PromotionAdminService: Symbol.for("PromotionAdminService"),
    PrismaService: Symbol.for("PrismaService"),
    UserRepository: Symbol.for("UserRepository"),
    UserQueryRepository: Symbol.for("UserQueryRepository"),
    PromotionQueryRepository: Symbol.for("PromotionQueryRepository"),
    PromotionRepository: Symbol.for("PromotionRepository"),
    HashServiceInterface: Symbol.for("HashServiceInterface"),
    BasicAuthMiddleware: Symbol.for("BasicAuthMiddleware"),
    ErrorsUnique: Symbol.for("ErrorsUnique"),
    JWTService: Symbol.for("JWTService"),
    AuthBearerMiddleware:  Symbol.for("AuthBearerMiddleware"),
}