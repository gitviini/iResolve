import { inject, Injectable } from '@angular/core';
import { Provider } from '../../models/interfaces/provider.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private url = 'http://localhost:3000/users';
  private http = inject(HttpClient);

  private providers = new BehaviorSubject<Provider[]>([]);
  
  getProviders(): Observable<any> {
    // init page
    const _page = 1;
    return this.http.get<Provider[]>(`${this.url}?_page=${_page}&_per_page=10`);
    //return this.opportunities$.asObservable();
  }

  search(term: string, list: Provider[]): Observable<Provider[]> {
    const lowerTerm = term.toLowerCase();
    const filtered = list.filter(
      (pr) =>
        pr.name.toLowerCase().includes(lowerTerm) ||
        pr.location.toLowerCase().includes(lowerTerm) ||
        pr.skills.filter(skill => skill.toLocaleLowerCase().includes(lowerTerm)).length
    );
    this.providers.next(filtered);

    return this.providers.asObservable();
    //return this.http.get<Opportunity[]>(`${this.url}?q=${term}`);
  }

  loadMore(page: number): Observable<any> {
    return this.http.get<Provider[]>(`${this.url}?_page=${page}&_per_page=10`);
  }
}
