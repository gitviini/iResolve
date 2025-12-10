export interface Opportunity {
    id: string;
    contractorNick: string;
    contractorName: string;
    contractorAvatar: string;
    isVerified: boolean;
    title: string;
    price: number;
    skills: string;
    category?: string; // [ADICIONADO] Adicionado como opcional (?) para evitar quebra em outros lugares
    /* location: string; */
    cep: string;
    address: string;
    description: string;
    images: string[];
    timePosted: string;
}