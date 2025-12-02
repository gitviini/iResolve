import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-providercard',
  imports: [RouterLink],
  templateUrl: './providercard.html',
  styleUrl: './providercard.css',
})

export class Providercard {
  // provider infos
  nick = input<string>();
  name = input<string>();
  avatarUrl = input<string>();
  rating = input<number>();
  location = input<string>();
  skills = input<string>();
  isVerified = input<boolean>();
}
