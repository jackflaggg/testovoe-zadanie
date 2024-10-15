export interface InQueryPromotionModel {
    searchNameTerm?: string | null;
    sortBy?: string;
    sortDirection?: string;
    cursor?: number | null; // Добавляем параметр курсора
    pageSize?: number;
}