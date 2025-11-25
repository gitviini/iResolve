import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from '../../../core/services/review.service';
import { ToastService } from '../../../core/services/toast.service';
import { ReviewInterface } from '../../../core/models/interfaces/review.interface';

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.css'
})
export class RateComponent {
  reviewService = inject(ReviewService);
  toastService = inject(ToastService);
  router = inject(Router);

  rating = 0;
  comment = '';
  isLoading = false;
  stars = [1, 2, 3, 4, 5]; 

  setRating(star: number) {
    this.rating = star;
  }

  async submit() {
    if (this.rating === 0) {
      this.toastService.add("Por favor, selecione uma nota.", "warning");
      return;
    }

    this.isLoading = true;

    const review: ReviewInterface = {
      contractId: '123',
      rating: this.rating,
      comment: this.comment,
      reviewerName: 'Vinicius',
      targetName: 'Jorge Lucio'
    };

    const success = await this.reviewService.submitReview(review);
    this.isLoading = false;

    if (success) {
      this.toastService.add("Avaliação enviada com sucesso!", "sucess");
      this.router.navigate(['/home']); 
    } else {
      this.toastService.add("Erro ao enviar avaliação.", "error");
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}