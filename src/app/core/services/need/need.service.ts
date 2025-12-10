import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Opportunity } from '../../models/interfaces/opportunity.interface';
import { NeedInterface } from '../../models/interfaces/need.interface';

@Injectable({
  providedIn: 'root'
})
export class NeedService {
  http = inject(HttpClient);
  private url = "http://localhost:8080/needs";

  // --- [INTEGRAÇÃO] Descomentar este método quando o Back-end estiver merged ---
  /*
  getNeedById(id: string): Observable<Opportunity> {
    const authToken = localStorage.getItem("authToken");
    const headers = { "Authorization": `Bearer ${authToken}` };
    return this.http.get<Opportunity>(`${this.url}/${id}`, { headers });
  }
  */

  // --- MOCK ATIVO UH15 (DETALHES) (Remover após integração)---
  private mockNeed: Opportunity = {
    id: '55555555-5555-5555-5555-555555555555',
    title: 'Passear com cachorro',
    description: 'Preciso de alguém para passear com a Tieta duas vezes ao dia. Ela é dócil mas tem muita energia.',
    price: 100.00,
    address: 'Torre - 50620-520',
    cep: '50620-520',
    skills: 'Pet',
    contractorName: 'Jorge Lucio',
    contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jorge',
    contractorNick: 'jorge.lucio',
    isVerified: true,
    images: ['https://placedog.net/500/280?id=1', 'https://placedog.net/500/280?id=2'],
    timePosted: 'Agora'
  };

  // [UH15] Busca por ID (Mockado)
  getNeedById(id: string): Observable<Opportunity> {
    return of(this.mockNeed);
  }

  // [UH3] Criar Necessidade (Mockado) - O MÉTODO QUE FALTAVA
  async createNeed(need: NeedInterface): Promise<boolean> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Necessidade Publicada (Mock):", need);
    
    return true;
  }
}