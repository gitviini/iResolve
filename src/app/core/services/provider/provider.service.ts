import { inject, Injectable } from '@angular/core';
import { Provider } from '../../models/interfaces/provider.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private url = 'http://localhost:8080/users';
  private http = inject(HttpClient);

  private providers = new BehaviorSubject<Provider[]>([]);
  
  getProviders(): Observable<any> {
    // init page
    const page = 0;
    const params = {page: page, size: 10};
    const authToken = localStorage.getItem("authToken");
    const headers = {
      "Authorization": `Bearer ${authToken}`
    }
    return this.http.get<Provider[]>(`${this.url}`, {params: params, headers: headers});
    //return this.opportunities$.asObservable();
  }

  search(term: string, list: Provider[]): Observable<Provider[]> {
    const lowerTerm = term.toLowerCase();
    const filtered = list.filter(
      (pr) =>
        pr.name.toLowerCase().includes(lowerTerm) ||
        pr.location.toLowerCase().includes(lowerTerm) ||
        pr.skills.toLowerCase().includes(lowerTerm)
    );
    this.providers.next(filtered);

    return this.providers.asObservable();
  }

  loadMore(page: number): Observable<any> {
    const params = {page: page, size: 10};
    const authToken = localStorage.getItem("authToken");
    const headers = {
      "Authorization": `Bearer ${authToken}`
    }
    return this.http.get<Provider[]>(`${this.url}`, {params: params, headers: headers});
  }
}
