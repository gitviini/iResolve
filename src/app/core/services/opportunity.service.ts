import { inject, Injectable } from '@angular/core';
import { Opportunity } from '../models/interfaces/opportunity.interface';
import { BehaviorSubject, Observable, of } from 'rxjs'; // Adicionado 'of'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private url = "http://localhost:8080/needs";
  private http = inject(HttpClient);

  // --- DADOS MOCKADOS PARA A HOME ---
  private mockOpportunities: Opportunity[] = [
    {
      id: '55555555-5555-5555-5555-555555555555', // ID igual ao do mock de detalhes
      title: 'Passear com cachorro',
      price: 100.00,
      address: 'Torre - 50620-520',
      cep: '50620-520',
      skills: 'Pet',
      description: 'Preciso de alguém para passear com a Tieta duas vezes ao dia.',
      contractorName: 'Jorge Lucio',
      contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jorge',
      contractorNick: 'jorge.lucio',
      isVerified: true,
      images: ['https://placedog.net/500/280?id=1'],
      timePosted: 'Agora'
    },
    {
      id: '2',
      title: 'Consertar Encanamento',
      price: 150.00,
      address: 'Madalena - 50610-000',
      cep: '50610-000',
      skills: 'Encanador',
      description: 'Pia da cozinha com vazamento urgente.',
      contractorName: 'Maria Silva',
      contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maria',
      contractorNick: 'maria.s',
      isVerified: false,
      images: [],
      timePosted: 'Há 2h'
    }
  ];

  // Método ajustado para retornar o Mock
  getOpportunities() : Observable<any> {
    // Simula a estrutura paginada que o backend retornaria
    const mockResponse = {
        content: this.mockOpportunities,
        totalPages: 1,
        totalElements: 2
    };
    
    return of(mockResponse);
  }

  search(term: string, list: Opportunity[]): Observable<Opportunity[]> {
    const lowerTerm = term.toLowerCase();
    const filtered = list.filter(op => 
      op.title.toLowerCase().includes(lowerTerm) ||
      op.address.toLowerCase().includes(lowerTerm)
    );
    const opportunities = new BehaviorSubject<Opportunity[]>([]);
    opportunities.next(filtered);

    return opportunities.asObservable();
  }

  loadMore(page: number): Observable<any> {
    // Retorna vazio pois não temos mais mocks para scroll infinito
    return of({ content: [] });
  }
}