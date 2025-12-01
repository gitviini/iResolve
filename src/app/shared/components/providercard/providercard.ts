import { Component, input } from '@angular/core';

@Component({
  selector: 'app-providercard',
  imports: [],
  templateUrl: './providercard.html',
  styleUrl: './providercard.css',
})

export class Providercard {
  // provider infos
  name = input<string>();
  avatarUrl = input<string>();
  rating = input<number>();
  location = input<string>();
  skills = input<string>();
  isVerified = input<boolean>();
}
