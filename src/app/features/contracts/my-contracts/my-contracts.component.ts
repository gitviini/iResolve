import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContractService } from '../../../core/services/contract.service';
import { Contract } from '../../../core/models/interfaces/contract.interface';

@Component({
  selector: 'app-my-contracts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-contracts.component.html',
  styleUrl: './my-contracts.component.css'
})
export class MyContractsComponent implements OnInit {
  contractService = inject(ContractService);
  router = inject(Router);

  activeTab: 'ACTIVE' | 'HISTORY' = 'ACTIVE';
  allContracts: Contract[] = [];
  filteredContracts: Contract[] = [];

  ngOnInit(): void {
    this.contractService.getContracts().subscribe(data => {
      this.allContracts = data;
      this.filterContracts();
    });
  }

  switchTab(tab: 'ACTIVE' | 'HISTORY') {
    this.activeTab = tab;
    this.filterContracts();
  }

  filterContracts() {
    if (this.activeTab === 'ACTIVE') {
      this.filteredContracts = this.allContracts.filter(c => 
        c.status === 'IN_PROGRESS' || c.status === 'PENDING'
      );
    } else {
      this.filteredContracts = this.allContracts.filter(c => 
        c.status === 'COMPLETED' || c.status === 'CANCELLED'
      );
    }
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  // Navega para o chat ou detalhes (simulação)
  openDetails(id: string) {
    console.log("Abrir contrato", id);
    // Futuramente poderia ir para uma tela de detalhes do contrato
  }
}