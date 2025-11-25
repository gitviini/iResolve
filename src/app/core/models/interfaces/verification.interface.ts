export type VerificationStatus = 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED';

export interface VerificationResponse {
    status: VerificationStatus;
    message?: string;
    documentUrl?: string;
}