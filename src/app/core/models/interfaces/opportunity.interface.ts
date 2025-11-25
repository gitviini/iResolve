export interface Opportunity {
    id: string;
    contractorName: string;
    contractorAvatar: string;
    isVerified: boolean;
    title: string;
    price: number;
    location: string;
    description: string;
    images: string[];
    timePosted: string;
}