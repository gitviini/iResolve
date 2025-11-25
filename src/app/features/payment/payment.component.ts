import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { ToastService } from '../../core/services/toast.service';
import { ContractDetails } from '../../core/models/interfaces/payment.interface';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importante para pipes de moeda

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink, CommonModule], // CommonModule para usar o pipe currency
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  paymentService = inject(PaymentService);
  toastService = inject(ToastService);
  router = inject(Router);

  contract!: ContractDetails;
  isLoading = false;

  ngOnInit(): void {
    this.contract = this.paymentService.getContractDetails();
  }

  async confirmPayment() {
    this.isLoading = true;
    
    const success = await this.paymentService.processPayment(this.contract.id);
    
    this.isLoading = false;

    if (success) {
      // [Checklist Item 3] - Notificação simulada
      this.toastService.add("Pagamento em garantia realizado!", "sucess");
      
      // Redireciona ou atualiza a tela (aqui apenas mostramos mensagem de sucesso)
      // Em um app real, iria para a tela de detalhes do contrato ativo
    } else {
      this.toastService.add("Falha no pagamento. Tente novamente.", "error");
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}