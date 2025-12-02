import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Opportunity } from '../../core/models/interfaces/opportunity.interface';

interface ContractInterface extends Opportunity{
  name: string
};

@Component({
  selector: 'app-contracts',
  imports: [RouterLink],
  templateUrl: './contracts.html',
  styleUrl: './contracts.css'
})
export class Contracts {
  contracts ?: ContractInterface[];

  constructor(){    
  }
}
