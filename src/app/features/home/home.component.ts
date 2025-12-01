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
import { Needcard } from '../../shared/components/needcard/needcard';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, Navbar, Needcard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  opportunityService = inject(OpportunityService);
  providerService = inject(ProviderService);
  toastService = inject(ToastService);
  router = inject(Router);

  page = 1;
  maxPage = 1;
  /* activeTab: 'PROVIDERS' | 'NEEDS' = 'PROVIDERS';  */
  searchTerm: string = '';

  opportunities: Opportunity[] = [];
  providers: Provider[] = [];

  // Controle de loading do scroll infinito
  isLoadingMore = false;

  ngOnInit(): void {
    this.opportunityService.getOpportunities().subscribe({
      next: (_data) => {
        const { data, pages } = _data;
        this.maxPage = pages;
        this.opportunities = data;
      },
    });

    this.providerService.getProviders().subscribe((data) => {
      this.providers = data;
    });

    onscroll = (event: any) => {
      if (!this.isLoadingMore && this.page < this.maxPage) {
        const element = event.target.scrollingElement;
        // Verifica se chegou no final do scroll (com uma margem de 50px)
        if (element.scrollHeight - element.scrollTop <= element.clientHeight + 70) {
          this.loadMoreItems();
        }
      }
    };
  }

  /* switchTab(tab: 'PROVIDERS' | 'NEEDS') {
    this.activeTab = tab;
    this.searchTerm = ''; 
    this.onSearch();
  } */

  onSearch() {
    this.opportunityService.search(this.searchTerm);
  }

  loadMoreItems() {
    this.isLoadingMore = true;
    this.page++;

    // Simula delay de carregamento
    setTimeout(() => {
      this.opportunityService.loadMore(this.page).subscribe({
        next: (_data) => {
          const { data } = _data;

          this.opportunities = [...this.opportunities, ...data];
        },
        error: (err) => {
          console.error('Erro ao carregar necessidades:', err);
        },
      });
      this.isLoadingMore = false;
    }, 1000);
  }

  openChat(id: string) {
    this.router.navigate(['/chat']);
  }

  goToPublish() {
    this.router.navigate(['/needs/publish']);
  }
}
