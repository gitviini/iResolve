import { Opportunity } from './opportunity.interface';

export interface UserProfile {
  name: string;
  email: string;
  cpf: string;
  nickname: string;
  status: 'AVAILABLE' | 'BUSY';
  blockedDates: string[];
  neighborhood: string;
  skills: string[];
  servicesCount: number;
  needsCount: number;
  rating: number;
  avatarUrl: string;
  biography: string;
  needs: Opportunity[];
}
