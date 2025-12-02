import { inject, Injectable } from '@angular/core';
import { NeedInterface } from '../../models/interfaces/need.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NeedService {
  http = inject(HttpClient);
  private url = "http://localhost:8080/needs";
  // Simula a criação da necessidade
  async createNeed(need: NeedInterface): Promise<boolean> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Necessidade Publicada:", need);
    
    return true;
  }
}