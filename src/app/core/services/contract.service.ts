import { Injectable } from '@angular/core';
import { Contract } from '../models/interfaces/contract.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private mockContracts: Contract[] = [
    // --- EM ANDAMENTO ---
    {
      id: '101',
      title: 'Pintura da Sala',
      description: 'Pintura completa de sala 20m²',
      price: 250.00,
      status: 'IN_PROGRESS',
      startDate: '10/12/2025',
      counterpartyName: 'Jorge Lucio',
      counterpartyAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jorge',
      role: 'CONTRACTOR' // Eu contratei
    },
    {
      id: '102',
      title: 'Conserto de Vazamento',
      description: 'Torneira da cozinha pingando',
      price: 80.00,
      status: 'PENDING',
      startDate: '12/12/2025',
      counterpartyName: 'Ana Silva',
      counterpartyAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ana',
      role: 'PROVIDER' // Eu vou prestar o serviço
    },
    // --- HISTÓRICO ---
    {
      id: '201',
      title: 'Passeio com Rex',
      description: 'Passeio de 1h no parque',
      price: 40.00,
      status: 'COMPLETED',
      startDate: '01/11/2025',
      counterpartyName: 'Carlos Souza',
      counterpartyAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos',
      role: 'PROVIDER'
    },
    {
      id: '202',
      title: 'Instalação de Chuveiro',
      description: 'Troca de resistência e instalação',
      price: 60.00,
      status: 'CANCELLED',
      startDate: '20/10/2025',
      counterpartyName: 'Maria',
      counterpartyAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maria',
      role: 'CONTRACTOR'
    }
  ];

  private contracts$ = new BehaviorSubject<Contract[]>(this.mockContracts);

  getContracts(): Observable<Contract[]> {
    return this.contracts$.asObservable();
  }
}