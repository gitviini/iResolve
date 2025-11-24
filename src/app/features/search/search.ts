import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../core/services/search.service';
import { ToastService } from '../../core/services/toast.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  searchService = inject(SearchService);
  toastService = inject(ToastService);

  providers: any[] = [];
  searchTerm: string = '';
  selectedFilter: string = '';
  page: number = 0;
  loading: boolean = false;
  
  availableFilters = ['Pedreiro', 'Pintor', 'Carpinteiro', 'Eletricista', 'Diarista'];

  ngOnInit() {
    this.doSearch();
  }

  onSearch() {
    this.page = 0;
    this.providers = [];
    this.doSearch();
  }

  toggleFilter(filter: string) {
    this.selectedFilter = this.selectedFilter === filter ? '' : filter;
    this.page = 0;
    this.providers = [];
    this.doSearch();
  }

  // --- ATUALIZADO PARA USAR ASYNC/AWAIT (FETCH) ---
  async doSearch() {
    this.loading = true;
    
    try {
      const response = await this.searchService.searchProviders(this.searchTerm, this.selectedFilter, this.page);
      
      // O Spring retorna um objeto Page, a lista está em 'content'
      if (response && response.content) {
        this.providers = [...this.providers, ...response.content];
      } else {
        this.providers = [];
      }

    } catch (error) {
      this.toastService.add("Falha ao pesquisar prestadores", "error");
    } finally {
      this.loading = false;
    }
  }

  loadMore() {
    this.page++;
    this.doSearch();
  }
}