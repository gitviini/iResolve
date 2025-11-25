import { Injectable } from '@angular/core';
import { ReviewInterface } from '../models/interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  // Envia a avaliação
  async submitReview(review: ReviewInterface): Promise<boolean> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Avaliação enviada:", review);
    // Aqui o backend processaria a nota
    
    return true;
  }
}