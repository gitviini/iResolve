import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Toast } from './core/components/toast/toast';
import { ToastService } from './core/services/toast/toast.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  template: `
    <section>
      <!-- TOAST MENSAGES [UH1] -->
      <div class="global-toast-container">
        @for (toast of toastService.toasts; track $index) {
          <app-toast [type]="toast.type" [message]="toast.message"/>
        }
      </div>
      <router-outlet></router-outlet>
    </section>
  `,
  styleUrl: "app.css",
})
export class App {
  toastService = inject(ToastService);
}
