import { Opportunity } from "./opportunity.interface";

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    rating: number;
    needsCount: number;
    servicesCount: number;
    location: string;
    status: 'AVAILABLE' | 'BUSY';
    blockedDates: string[]; // MUDOU: Agora é lista de strings 'YYYY-MM-DD'
    bio: string;
    skills: string[];
    myNeeds: Opportunity[];
}