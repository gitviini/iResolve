import { inject, Injectable } from '@angular/core';
import { Opportunity } from '../models/interfaces/opportunity.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private url = "http://localhost:8080/needs";
  private http = inject(HttpClient);

  getOpportunities() : Observable<any> {
    // init page
    const page = 1;
    const params = {page: page, size: 10};
    const authToken = localStorage.getItem("authToken");
    const headers = {
      "Authorization": `Bearer ${authToken}`
    }
    return this.http.get<Opportunity[]>(`${this.url}`, {params: params, headers: headers});
  }

  search(term: string, list: Opportunity[]): Observable<Opportunity[]> {
    const lowerTerm = term.toLowerCase();
    const filtered = list.filter(op => 
      op.title.toLowerCase().includes(lowerTerm) ||
      op.cep.toLowerCase().includes(lowerTerm) ||
      op.address.toLowerCase().includes(lowerTerm) ||
      op.description.toLowerCase().includes(lowerTerm)
    );
    const opportunities = new BehaviorSubject<Opportunity[]>([]);
    opportunities.next(filtered);

    return opportunities.asObservable();
    //return this.http.get<Opportunity[]>(`${this.url}?q=${term}`);
  }

  loadMore(page: number): Observable<any> {
    const params = {page: page, size: 10};
    const authToken = localStorage.getItem("authToken");
    const headers = {
      "Authorization": `Bearer ${authToken}`
    }
    return this.http.get<Opportunity[]>(`${this.url}`, {params: params, headers: headers});
  }
}