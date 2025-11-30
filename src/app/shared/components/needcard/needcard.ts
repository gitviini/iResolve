import { Component, input } from '@angular/core';

@Component({
  selector: 'app-needcard',
  imports: [],
  templateUrl: './needcard.html',
  styleUrl: './needcard.css',
})
export class Needcard {
  name = input<string>();
  avatarUrl = input<string>();
  rating = input<number>();
  location = input<string>();
  skills = input<string>();
  isVerified = input<boolean>();
}
