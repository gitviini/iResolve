import { Injectable } from '@angular/core';
import { ContractDetails } from '../models/interfaces/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // Mock de dados para a tela (Simulando o que viria do backend)
  private mockContract: ContractDetails = {
    id: '123',
    title: 'Passear com cachorro',
    value: 100.00,
    location: 'Torre - Recife',
    description: 'Vou viajar e preciso de alguém para passear com meu cachorro Rex por 3 dias. Ele é dócil.',
    providerName: 'Jorge Lucio',
    contractorName: 'Vinicius Gabriel',
    status: 'PENDING'
  };

  getContractDetails(): ContractDetails {
    return this.mockContract;
  }

  // Simula o pagamento [Checklist Item 1]
  async processPayment(contractId: string): Promise<boolean> {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Atualiza status para "Pagamento em Garantia" [Checklist Item 2]
    this.mockContract.status = 'PAID_ESCROW';
    
    return true;
  }
}