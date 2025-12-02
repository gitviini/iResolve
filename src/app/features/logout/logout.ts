import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../core/services/profile/profile.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  template: "",
})
export class Logout {
  router = inject(Router);
  authService = inject(AuthService);

  constructor(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
