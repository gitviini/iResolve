import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importante para o input de busca
import { OpportunityService } from '../../core/services/opportunity.service';
import { Opportunity } from '../../core/models/interfaces/opportunity.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  opportunityService = inject(OpportunityService);
  router = inject(Router);

  opportunities: Opportunity[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    // Se inscreve para receber os dados do serviço
    this.opportunityService.getOpportunities().subscribe(data => {
      this.opportunities = data;
    });
  }

  onSearch() {
    this.opportunityService.search(this.searchTerm);
  }

  // Ação: Tenho Interesse -> Vai para o Chat (UH9)
  openChat(opportunityId: string) {
    // Em um app real, você passaria o ID na rota (ex: ['/chat', opportunityId])
    this.router.navigate(['/chat']);
  }

  // Ação: Publicar -> Vai para Publicar Necessidade (UH3)
  goToPublish() {
    this.router.navigate(['/needs/publish']);
  }
}