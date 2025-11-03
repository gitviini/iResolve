import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../interfaces/user.interface';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  authService: AuthService = inject(AuthService);

  formRegister = new FormGroup({
    name: new FormControl(""),
    cpf: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
  });

  submitForm(): void {
    const userData : UserInterface = {
      "name": this.formRegister.value.name ?? "",
      "cpf": this.formRegister.value.cpf ?? "",
      "password": this.formRegister.value.password ?? ""
    }

    this.authService.registerUser(userData)
  }
}
