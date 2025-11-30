import { Component, input } from '@angular/core';

@Component({
  selector: 'app-providercard',
  imports: [],
  templateUrl: './providercard.html',
  styleUrl: './providercard.css',
})
export class Providercard {
  title = input<string>();
  description = input<string>();
  category = input<string>();
  value = input<number>();
  images = input<File[]>();
  status = input<'OPEN' | 'IN_PROGRESS' | 'CLOSED'>();
}
