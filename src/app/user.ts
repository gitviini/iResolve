import { Component, input } from '@angular/core';

@Component({
    selector: 'app-user',
    template: `<p>Hello, {{ name() }}!</p>`
})
export class User {
    name = input<string>(); // Declares an optional input named 'name'
    // Or for a required input:
    // userId = input.required<number>();
}