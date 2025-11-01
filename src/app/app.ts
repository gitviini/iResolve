import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <section>
      <router-outlet></router-outlet>
    </section>
  `,
})
export class App {
}
