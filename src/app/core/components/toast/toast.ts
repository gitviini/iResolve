import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class Toast {
  type = input.required<string>();
  message = input.required<string>();
}
