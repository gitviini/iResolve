import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-needcard',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './needcard.html',
  styleUrl: './needcard.css',
})

export class Needcard {
  // owner infos
  nick = input<string>();
  avatarUrl = input<string>();
  name = input<string>();
  isVerified = input<boolean>();
  
  // need infos
  id = input<string>();
  title = input<string>();
  location = input<string>();
  description = input<string>();
  category = input<string>();
  price = input<number>();
  images = input<string[]>();
  status = input<'OPEN' | 'IN_PROGRESS' | 'CLOSED'>();
}
