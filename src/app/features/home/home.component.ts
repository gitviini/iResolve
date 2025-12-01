import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { OpportunityService } from '../../core/services/opportunity.service';
import { ToastService } from '../../core/services/toast/toast.service';

import { Opportunity } from '../../core/models/interfaces/opportunity.interface';
import { Navbar } from '../../core/components/navbar/navbar';
import { Needcard } from '../../shared/components/needcard/needcard';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink, Navbar, Needcard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  opportunityService = inject(OpportunityService);
  toastService = inject(ToastService);
  router = inject(Router);

  page = 1;
  maxPage = 1;
  searchTerm: string = '';

  opportunities: Opportunity[] = [];

  // Controle de loading do scroll infinito
  isLoadingMore = false;

  // --- INIT OPPORTUNITIES ---
  setOpportunities() {
    this.page = 1;
    this.opportunityService.getOpportunities().subscribe({
      next: (_data) => {
        const { data, pages } = _data;
        this.maxPage = pages;
        this.opportunities = data;
      },
    });
  }

  ngOnInit(): void {
    this.setOpportunities();

    // --- SCROLL HANDLER ---
    // if page isn't smaller than maxPage: do nothing
    onscroll = (event: any) => {
      if(!event.target) return;
      if (!this.isLoadingMore && this.page < this.maxPage) {
        const element = event.target.scrollingElement;
        // Verifica se chegou no final do scroll (com uma margem de 50px)
        if (element.scrollHeight - element.scrollTop <= element.clientHeight + 70) {
          this.loadMoreItems();
        }
      }
    };
  }

  // --- SEARCH OPPORTUNITIES ---
  // if searchTerm is empty: reset opportunities list
  onSearch() {
    if (!this.searchTerm) this.setOpportunities();
    this.opportunityService.search(this.searchTerm, this.opportunities).subscribe({
      next: (data) => {
        this.opportunities = data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  // --- LOAD MORE OPPORTUNITIES ---
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

  // --- NEW PUBLISH MODAL REDIRECT ---
  goToPublish() {
    this.router.navigate(['/needs/publish']);
  }
}
