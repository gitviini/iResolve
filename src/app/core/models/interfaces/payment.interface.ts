export interface ContractDetails {
    id: string;
    title: string;
    value: number;
    location: string;
    description: string;
    providerName: string;
    contractorName: string; // Quem está contratando (usuário logado)
    status: 'PENDING' | 'PAID_ESCROW' | 'COMPLETED';
}