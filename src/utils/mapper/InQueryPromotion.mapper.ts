import {InQueryPromotionModel} from "../../models/queryParams.models";

export const queryHelperToPromotion = (queryPromotion: InQueryPromotionModel) => {
    return {
        cursor: queryPromotion.cursor ?? null,
        pageSize: queryPromotion.pageSize ?? 10,
        sortBy: queryPromotion.sortBy ?? 'createdAt',
        sortDirection: queryPromotion.sortDirection ?? 'desc',
        searchNameTerm: queryPromotion.searchNameTerm ?? null,
    }
}