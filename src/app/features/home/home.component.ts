import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Services
// Note que usamos apenas dois '../' para voltar à pasta 'app'
import { OpportunityService } from '../../core/services/opportunity.service';
import { ProviderService } from '../../core/services/provider.service';
import { ToastService } from '../../core/services/toast.service';

// Interfaces
import { Opportunity } from '../../core/models/interfaces/opportunity.interface';
import { Provider } from '../../core/models/interfaces/provider.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // Injeção de dependências
  opportunityService = inject(OpportunityService);
  providerService = inject(ProviderService);
  toastService = inject(ToastService);
  router = inject(Router);

  // Estado da Tela
  activeTab: 'PROVIDERS' | 'NEEDS' = 'PROVIDERS'; // Aba inicial
  searchTerm: string = '';

  // Dados
  opportunities: Opportunity[] = [];
  providers: Provider[] = [];

  ngOnInit(): void {
    // Carrega a lista de Vagas (Oportunidades)
    this.opportunityService.getOpportunities().subscribe(data => {
      this.opportunities = data;
    });

    // Carrega a lista de Prestadores
    this.providerService.getProviders().subscribe(data => {
      this.providers = data;
    });
  }

  // --- Lógica das Abas e Busca ---

  switchTab(tab: 'PROVIDERS' | 'NEEDS') {
    this.activeTab = tab;
    this.searchTerm = ''; // Limpa a busca ao trocar de aba
    this.onSearch();      // Reseta a listagem para o original
  }

  onSearch() {
    if (this.activeTab === 'NEEDS') {
      this.opportunityService.search(this.searchTerm);
    } else {
      this.providerService.search(this.searchTerm);
    }
  }

  // --- Navegação Principal (Cards) ---

  openChat(id: string) {
    // Navega para o chat (UH9)
    this.router.navigate(['/chat']);
  }

  goToPublish() {
    // Navega para publicar necessidade (UH3)
    this.router.navigate(['/needs/publish']);
  }

  // --- Navegação do Menu Inferior (Bottom Nav) ---

  goToHome() {
    // Rola suavemente para o topo e reseta filtros se quiser
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.searchTerm) {
      this.searchTerm = '';
      this.onSearch();
    }
  }

  goToSearch() {
    // Foca no input de busca para facilitar
    const input = document.querySelector<HTMLInputElement>('.search-box input');
    if (input) {
      input.focus();
    }
  }

  goToChatList() {
    this.router.navigate(['/chat']);
  }

  goToProfile() {
    this.router.navigate(['/profile']); // Agora vai para a tela real!
  }
  }
