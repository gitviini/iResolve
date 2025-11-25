import { Injectable } from '@angular/core';
import { Opportunity } from '../models/interfaces/opportunity.interface'; // Ajuste o nome se necessário
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  private mockOpportunities: Opportunity[] = [
    {
      id: '1',
      contractorName: 'Jorge',
      contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jorge',
      isVerified: true,
      title: 'Passear com cachorro',
      price: 100.00,
      location: 'Torre',
      description: 'Preciso de alguém para passear com meu cachorro Rex.',
      images: ['https://placedog.net/500/280?id=1'],
      timePosted: '2h'
    },
    {
      id: '2',
      contractorName: 'Maria',
      contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maria',
      isVerified: false,
      title: 'Cuidar de Hamster',
      price: 60.00,
      location: 'Madalena',
      description: 'Sairei por 3 dias e preciso de ajuda.',
      images: [], 
      timePosted: '5h'
    }
  ];

  private opportunities$ = new BehaviorSubject<Opportunity[]>(this.mockOpportunities);

  getOpportunities() {
    return this.opportunities$.asObservable();
  }

  search(term: string) {
    const lowerTerm = term.toLowerCase();
    const filtered = this.mockOpportunities.filter(op => 
      op.title.toLowerCase().includes(lowerTerm) ||
      op.location.toLowerCase().includes(lowerTerm)
    );
    this.opportunities$.next(filtered);
  }
}