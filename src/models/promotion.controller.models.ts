export interface PromotionControllerModels {
    login: () => Promise<void>;
    promotions: () => Promise<void>;
    suppliers: () => Promise<void>;
}