import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { OpportunityService } from '../../core/services/opportunity.service';
import { ProviderService } from '../../core/services/provider/provider.service';
import { ToastService } from '../../core/services/toast/toast.service';

import { Opportunity } from '../../core/models/interfaces/opportunity.interface';
import { Provider } from '../../core/models/interfaces/provider.interface';
import { Navbar } from '../../core/components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  opportunityService = inject(OpportunityService);
  providerService = inject(ProviderService);
  toastService = inject(ToastService);
  router = inject(Router);

  activeTab: 'PROVIDERS' | 'NEEDS' = 'PROVIDERS'; 
  searchTerm: string = '';

  opportunities: Opportunity[] = [];
  providers: Provider[] = [];
  
  // Controle de loading do scroll infinito
  isLoadingMore = false; 

  ngOnInit(): void {
    this.opportunityService.getOpportunities().subscribe(data => {
      this.opportunities = data;
    });

    this.providerService.getProviders().subscribe(data => {
      this.providers = data;
    });
  }

  switchTab(tab: 'PROVIDERS' | 'NEEDS') {
    this.activeTab = tab;
    this.searchTerm = ''; 
    this.onSearch();      
  }

  onSearch() {
    if (this.activeTab === 'NEEDS') {
      this.opportunityService.search(this.searchTerm);
    } else {
      this.providerService.search(this.searchTerm);
    }
  }

  // [UH13] Scroll Infinito
  onScroll(event: any) {
    // Só carrega mais se estiver na aba de NECESSIDADES e não estiver carregando
    if (this.activeTab === 'NEEDS' && !this.isLoadingMore) {
      const element = event.target;
      // Verifica se chegou no final do scroll (com uma margem de 50px)
      if (element.scrollHeight - element.scrollTop <= element.clientHeight + 50) {
        this.loadMoreItems();
      }
    }
  }

  loadMoreItems() {
    this.isLoadingMore = true;
    // Simula delay de carregamento
    setTimeout(() => {
      this.opportunityService.loadMore();
      this.isLoadingMore = false;
    }, 1000);
  }

  openChat(id: string) {
    this.router.navigate(['/chat']);
  }

  goToPublish() {
    this.router.navigate(['/needs/publish']);
  }

  goToHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.searchTerm) {
      this.searchTerm = '';
      this.onSearch();
    }
  }

  goToSearch() {
    const input = document.querySelector<HTMLInputElement>('.search-box input');
    if (input) input.focus();
  }

  goToChatList() {
    this.router.navigate(['/chat']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}