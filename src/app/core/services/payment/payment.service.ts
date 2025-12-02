import { Injectable } from '@angular/core';
import { ContractDetails } from '../../models/interfaces/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private mockContract: ContractDetails = {
    id: '123',
    title: 'Passear com cachorro',
    value: 100.00,
    location: 'Torre - Recife',
    description: 'Vou viajar e preciso de alguém para passear com meu cachorro Rex por 3 dias.',
    providerName: 'Jorge Lucio',
    contractorName: 'Vinicius Gabriel',
    status: 'PENDING'
  };

  getContractDetails(): ContractDetails {
    return this.mockContract;
  }

  // [NOVO] Calcula os valores finais para o checkout
  getPaymentSummary() {
    const baseValue = this.mockContract.value;
    const serviceFee = 3.00; // Taxa fixa ou % (ex: 3%)
    return {
      base: baseValue,
      fee: serviceFee,
      total: baseValue + serviceFee
    };
  }

  // Finaliza o pagamento
  async finalizePayment(method: 'PIX' | 'CARD'): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simula delay
    this.mockContract.status = 'PAID_ESCROW';
    return true;
  }
}