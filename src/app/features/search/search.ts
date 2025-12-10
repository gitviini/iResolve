import { Component, inject } from '@angular/core';

import { Provider } from '../../core/models/interfaces/provider.interface';
import { OpportunityService } from '../../core/services/opportunity.service';
import { ProviderService } from '../../core/services/provider/provider.service';
import { ToastService } from '../../core/services/toast/toast.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Needcard } from '../../shared/components/needcard/needcard';
import { Providercard } from '../../shared/components/providercard/providercard';
import { Navbar } from '../../core/components/navbar/navbar';
import { Opportunity } from '../../core/models/interfaces/opportunity.interface';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, Needcard, Providercard, Navbar],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  opportunityService = inject(OpportunityService);
  providerService = inject(ProviderService);
  toastService = inject(ToastService);
  router = inject(Router);

  page = {
    opportunities: 0,
    providers: 0,
  };
  maxPage = {
    opportunities: 0,
    providers: 0,
  };
  activeTab: 'PROVIDERS' | 'NEEDS' = 'PROVIDERS';
  searchTerm: string = '';

  opportunities: Opportunity[] = [];
  providers: Provider[] = [];

  // Controle de loading do scroll infinito
  isLoadingMore = false;

  switchTab(tab: 'PROVIDERS' | 'NEEDS') {
    this.activeTab = tab;
    this.searchTerm = '';
    this.onSearch();
  }

  // --- INIT SET PROVIDERS AND OPPORTUNITIES ---

  setProvidersAndOpportunities() {
    this.page.opportunities = 0;
    this.opportunityService.getOpportunities().subscribe({
      next: (_data) => {
        const { content, totalPages } = _data;
        this.maxPage.opportunities = totalPages;
        this.opportunities = content;
      },
    });

    this.page.providers = 0;
    this.providerService.getProviders().subscribe({
      next: (_data) => {
        const { content, totalPages } = _data;
        console.log(_data);
        this.maxPage.providers = totalPages;
        this.providers = content;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  ngOnInit(): void {
    this.setProvidersAndOpportunities();
    onscroll = (event: any) => {
      let canLoadingMore = true;

      switch(this.activeTab){
        case "NEEDS":
          canLoadingMore = this.page.opportunities < this.maxPage.opportunities;
          break;
        case "PROVIDERS":
          canLoadingMore = this.page.providers < this.maxPage.providers;
          break;
      }

      if (!this.isLoadingMore && canLoadingMore && (this.providers.length > 0 || this.opportunities.length > 0)) {
        const element = event.target.scrollingElement;
        // Verifica se chegou no final do scroll (com uma margem de 50px)
        if (element.scrollHeight - element.scrollTop <= element.clientHeight + 70) {
          this.loadMoreItems();
        }
      }
    };
  }

  // --- SEARCH PROVIDERS AND OPPORTUNITIES

  searchOpportunities() {
    this.opportunityService.search(this.searchTerm, this.opportunities).subscribe({
      next: (data: any) => {
        this.opportunities = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchProviders() {
    this.providerService.search(this.searchTerm, this.providers).subscribe({
      next: (data: any) => {
        this.providers = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSearch() {
    if (!this.searchTerm) this.setProvidersAndOpportunities();
    switch (this.activeTab) {
      case 'NEEDS':
        this.searchOpportunities();
        break;
      case 'PROVIDERS':
        this.searchProviders();
        break;
    }
  }

  // --- LOAD MORE PROVIDERS AND OPPORTUNITIES ---

  loadMoreProviders(){
    this.isLoadingMore = true;
    this.page.providers++;

    // Simula delay de carregamento
    setTimeout(() => {
      this.providerService.loadMore(this.page.providers).subscribe({
        next: (_data) => {
          const { content } = _data;

          console.log(content)

          this.providers = [...this.providers, ...content];
        },
        error: (err) => {
          console.error('Erro ao carregar provedores:', err);
        },
      });
      this.isLoadingMore = false;
    }, 1000);
  }

  loadMoreOpportunities(){
    this.isLoadingMore = true;
    this.page.opportunities++;

    // Simula delay de carregamento
    setTimeout(() => {
      this.opportunityService.loadMore(this.page.opportunities).subscribe({
        next: (_data) => {
          const { content } = _data;

          this.opportunities = [...this.opportunities, ...content];
        },
        error: (err) => {
          console.error('Erro ao carregar necessidades:', err);
        },
      });
      this.isLoadingMore = false;
    }, 1000);
  }

  loadMoreItems() {
    switch(this.activeTab){
      case "NEEDS":
        this.loadMoreOpportunities();
        break;
      case "PROVIDERS":
        this.loadMoreProviders();
        break;
    }
  }
}
