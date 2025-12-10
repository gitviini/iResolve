import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NeedService } from '../../../core/services/need/need.service';
import { Opportunity } from '../../../core/models/interfaces/opportunity.interface';

@Component({
  selector: 'app-need-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './need-details.component.html',
  styleUrl: './need-details.component.css'
})
export class NeedDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  needService = inject(NeedService);
  location = inject(Location);

  need?: Opportunity;

  ngOnInit() {
    // Pega o ID da URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.needService.getNeedById(id).subscribe(data => {
        this.need = data;
      });
    }
  }

  goBack() {
    this.location.back();
  }

  startNegotiation() {
    if (!this.need) return;
    
    // Navega para o Chat enviando os dados da necessidade no 'state'
    this.router.navigate(['/chat/room'], {
      state: { negotiationContext: this.need }
    });
  }
}