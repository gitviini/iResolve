import { Component, signal } from '@angular/core';
import { User } from './user';
@Component({
  selector: 'app-root',
  imports: [User],
  template: `
    <app-user name="vini"></app-user>
  `,
})
export class App {
}
