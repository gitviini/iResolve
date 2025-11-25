export interface ReviewInterface {
    contractId: string;
    rating: number; // 1 a 5
    comment: string;
    reviewerName: string;
    targetName: string; // Quem está sendo avaliado
}