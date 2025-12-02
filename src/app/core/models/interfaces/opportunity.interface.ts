export interface Opportunity {
    id: string;
    contractorNick: string;
    contractorName: string;
    contractorAvatar: string;
    isVerified: boolean;
    title: string;
    price: number;
    skills: string;
    /* location: string; */
    cep: string;
    address: string;
    description: string;
    images: string[];
    timePosted: string;
}