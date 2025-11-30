import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../core/services/payment/payment.service';
import { ToastService } from '../../core/services/toast/toast.service';
import { ContractDetails } from '../../core/models/interfaces/payment.interface';

@Component({
  selector: 'app-payment',
  imports: [RouterLink, CommonModule],
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

  // A função atualizada que leva para o checkout
  confirmPayment() {
    this.router.navigate(['/payment/checkout']);
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}