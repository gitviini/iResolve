import { Injectable } from '@angular/core';
import { Provider } from '../../models/interfaces/provider.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private mockProviders: Provider[] = [
    {
      id: '1',
      name: 'Jorge Lucio',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jorge',
      rating: 4.5,
      location: 'Torre',
      skills: ['Pedreiro', 'Carpinteiro'],
      isVerified: true
    },
    {
      id: '2',
      name: 'Ana Silva',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ana',
      rating: 5.0,
      location: 'Madalena',
      skills: ['Diarista', 'Cozinheira'],
      isVerified: true
    },
    {
      id: '3',
      name: 'Carlos Souza',
      avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos',
      rating: 4.2,
      location: 'Espinheiro',
      skills: ['Eletricista'],
      isVerified: false
    }
  ];

  private providers$ = new BehaviorSubject<Provider[]>(this.mockProviders);

  getProviders() {
    return this.providers$.asObservable();
  }

  search(term: string) {
    const lowerTerm = term.toLowerCase();
    const filtered = this.mockProviders.filter(p => 
      p.name.toLowerCase().includes(lowerTerm) ||
      p.location.toLowerCase().includes(lowerTerm) ||
      p.skills.some(skill => skill.toLowerCase().includes(lowerTerm))
    );
    this.providers$.next(filtered);
  }
}