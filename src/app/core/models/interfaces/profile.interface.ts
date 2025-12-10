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
    blockedDates: string[];
    bio: string;
    skills: string[];
    myNeeds: Opportunity[];
    myApplications: Opportunity[];
}