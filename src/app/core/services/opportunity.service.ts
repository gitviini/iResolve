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

  getOpportunities() : Observable<any> {
    // init page
    const _page = 1;
    return this.http.get<Opportunity[]>(`${this.url}?_page=${_page}&_per_page=10`);
    //return this.opportunities$.asObservable();
  }

  search(term: string, list: Opportunity[]): Observable<Opportunity[]> {
    const lowerTerm = term.toLowerCase();
    const filtered = list.filter(op => 
      op.title.toLowerCase().includes(lowerTerm) ||
      op.location.toLowerCase().includes(lowerTerm) ||
      op.description.toLowerCase().includes(lowerTerm)
    );
    const opportunities = new BehaviorSubject<Opportunity[]>([]);
    opportunities.next(filtered);

    return opportunities.asObservable();
    //return this.http.get<Opportunity[]>(`${this.url}?q=${term}`);
  }

  loadMore(page: number): Observable<any> {
    return this.http.get<Opportunity[]>(`${this.url}?_page=${page}&_per_page=10`);
  }
}