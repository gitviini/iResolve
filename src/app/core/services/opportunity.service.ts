import { Injectable } from '@angular/core';
import { Opportunity } from '../models/interfaces/opportunity.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  // Mock Inicial (Página 1)
  private initialData: Opportunity[] = [
    {
      id: '1',
      contractorName: 'Jorge',
      contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jorge',
      isVerified: true,
      title: 'Passear com cachorro',
      price: 100.00,
      location: 'Torre',
      description: 'Vou viajar e preciso de alguém para ficar com meu cachorro Rex.',
      images: ['https://placedog.net/500/280?id=1', 'https://placedog.net/500/280?id=2'],
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
      description: 'Sairei por 3 dias a trabalho e preciso de alguém para trocar água e comida.',
      images: ['https://placedog.net/500/280?id=3'], 
      timePosted: '5h'
    },
    {
      id: '3',
      contractorName: 'Carlos',
      contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos',
      isVerified: true,
      title: 'Pintar Muro',
      price: 250.00,
      location: 'Espinheiro',
      description: 'Preciso de um pintor para um muro externo de 15m². Tinta por minha conta.',
      images: [], 
      timePosted: '1d'
    }
  ];

  // Estado atual da lista
  private currentOpportunities: Opportunity[] = [...this.initialData];
  private opportunities$ = new BehaviorSubject<Opportunity[]>(this.currentOpportunities);

  getOpportunities() {
    return this.opportunities$.asObservable();
  }

  search(term: string) {
    const lowerTerm = term.toLowerCase();
    const filtered = this.initialData.filter(op => 
      op.title.toLowerCase().includes(lowerTerm) ||
      op.location.toLowerCase().includes(lowerTerm) ||
      op.description.toLowerCase().includes(lowerTerm)
    );
    this.opportunities$.next(filtered);
  }

  // [UH13] Simula "Infinite Scroll" (Carregar mais itens)
  loadMore() {
    // Adiciona novos itens fictícios simulando uma "Página 2"
    const moreItems: Opportunity[] = [
      {
        id: '4',
        contractorName: 'Fernanda',
        contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Fernanda',
        isVerified: true,
        title: 'Faxina Geral',
        price: 150.00,
        location: 'Boa Viagem',
        description: 'Apartamento de 2 quartos, preciso de faxina completa.',
        images: [],
        timePosted: '2d'
      },
      {
        id: '5',
        contractorName: 'Roberto',
        contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Roberto',
        isVerified: false,
        title: 'Consertar Torneira',
        price: 80.00,
        location: 'Casa Forte',
        description: 'Torneira da cozinha pingando muito.',
        images: [],
        timePosted: '3d'
      }
    ];

    // Adiciona ao estado atual
    this.currentOpportunities = [...this.currentOpportunities, ...moreItems];
    this.opportunities$.next(this.currentOpportunities);
  }
}