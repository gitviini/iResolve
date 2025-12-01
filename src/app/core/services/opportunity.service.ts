import { inject, Injectable } from '@angular/core';
import { Opportunity } from '../models/interfaces/opportunity.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private url = "http://localhost:3000/needs";
  private http = inject(HttpClient);

  // Mock Inicial (Página 1)
  private initialData: Opportunity[] = [
    
  ];

  // Estado atual da lista
  private currentOpportunities: Opportunity[] = [...this.initialData];
  private opportunities$ = new BehaviorSubject<Opportunity[]>(this.currentOpportunities);

  getOpportunities() : Observable<any> {
    // init page
    const _page = 1;
    return this.http.get<Opportunity[]>(`${this.url}?_page=${_page}&_per_page=10`);
    //return this.opportunities$.asObservable();
  }

  search(term: string): Observable<Opportunity[]> {
    return this.http.get<Opportunity[]>(`${this.url}?q=${term}`);
  }
  /* search(term: string) {
    const lowerTerm = term.toLowerCase();
    const filtered = this.initialData.filter(op => 
      op.title.toLowerCase().includes(lowerTerm) ||
      op.location.toLowerCase().includes(lowerTerm) ||
      op.description.toLowerCase().includes(lowerTerm)
    );
    this.opportunities$.next(filtered);
  } */

  loadMore(page: number): Observable<any> {
    return this.http.get<Opportunity[]>(`${this.url}?_page=${page}&_per_page=10`);
  }
  // [UH13] Simula "Infinite Scroll" (Carregar mais itens)
  /* loadMore() {
    // Adiciona novos itens fictícios simulando uma "Página 2"
    const moreItems: Opportunity[] = [
      
    ];

    // Adiciona ao estado atual
    this.currentOpportunities = [...this.currentOpportunities, ...moreItems];
    this.opportunities$.next(this.currentOpportunities);
  } */
}