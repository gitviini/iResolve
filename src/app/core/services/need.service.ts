import { Injectable } from '@angular/core';
import { NeedInterface } from '../models/interfaces/need.interface';

@Injectable({
  providedIn: 'root'
})
export class NeedService {

  // Simula a criação da necessidade
  async createNeed(need: NeedInterface): Promise<boolean> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Necessidade Publicada:", need);
    
    return true; 
  }
}