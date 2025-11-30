import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentService } from '../../../core/services/payment.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  paymentService = inject(PaymentService);
  toastService = inject(ToastService);
  router = inject(Router);

  summary = { base: 0, fee: 0, total: 0 };
  selectedMethod: 'PIX' | 'CARD' = 'CARD';
  
  // A PROPRIEDADE QUE ESTAVA FALTANDO
  isLoading = false; 

  ngOnInit(): void {
    this.summary = this.paymentService.getPaymentSummary();
  }

  selectMethod(method: 'PIX' | 'CARD') {
    this.selectedMethod = method;
  }

  async pay() {
    this.isLoading = true;
    const success = await this.paymentService.finalizePayment(this.selectedMethod);
    this.isLoading = false;

    if (success) {
      this.toastService.add(`Pagamento de R$ ${this.summary.total} confirmado!`, "sucess");
      this.router.navigate(['/home']);
    } else {
      this.toastService.add("Erro no processamento.", "error");
    }
  }

  goBack() {
    this.router.navigate(['/payment']);
  }
}