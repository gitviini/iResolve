import { Opportunity } from "./opportunity.interface"; // Reutilizando para a lista de necessidades

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    rating: number;
    needsCount: number;
    servicesCount: number;
    location: string;
    status: 'AVAILABLE' | 'BUSY'; // Disponível / Ocupado
    bio: string;
    skills: string[];
    myNeeds: Opportunity[]; // Lista de vagas criadas pelo usuário
}