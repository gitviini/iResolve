import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { OpportunityService } from '../../core/services/opportunity.service';
import { ToastService } from '../../core/services/toast/toast.service';

import { Opportunity } from '../../core/models/interfaces/opportunity.interface';
import { Navbar } from '../../core/components/navbar/navbar';
import { Needcard } from '../../shared/components/needcard/needcard';
import { ProfileService } from '../../core/services/profile/profile.service';
import { UserProfile } from '../../core/models/interfaces/profile.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink, Navbar, Needcard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  opportunityService = inject(OpportunityService);
  profileService = inject(ProfileService);
  toastService = inject(ToastService);
  router = inject(Router);

  page = 0;
  maxPage = 1;
  searchTerm: string = '';

  profile: UserProfile | undefined;
  opportunities: Opportunity[] = [];

  // Controle de loading do scroll infinito
  isLoadingMore = false;

  setProfile(){
    this.profileService.getProfile().subscribe({
      next: (data:any) =>{
        this.profile = data;
      },
      error: (err) =>{
        this.toastService.add("Erro ao carregar informações do usuário", 'error');
      }
    })
  }


  // --- INIT OPPORTUNITIES ---
  setOpportunities() {
    this.page = 0;
    this.opportunityService.getOpportunities().subscribe({
      next: (_data) => {
        const { content, totalPages } = _data;
        console.log(_data)
        this.maxPage = totalPages;
        this.opportunities = content;
      },
      error: (err) => {
        this.toastService.add("Erro ao carregar necessidades", 'error');
      }
    });
  }

  ngOnInit(): void {
    this.setProfile();

    this.setOpportunities();

    // --- SCROLL HANDLER ---
    // if page isn't smaller than maxPage: do nothing
    onscroll = (event: any) => {
      if(!event.target) return;
      if (!this.isLoadingMore && this.page < this.maxPage - 1 && this.opportunities.length > 0) {
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
        this.toastService.add("Erro ao procurar necessidades", 'error');
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
          const { content } = _data;
          this.opportunities = [...this.opportunities, ...content];
        },
        error: (err) => {
          this.toastService.add("Erro ao carregar mais necessidades", 'error');
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
