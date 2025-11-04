import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserInterface } from '../../../core/models/interfaces/user.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {
  // injeção de depedência : serviço de autenticação [UH1]
  authService: AuthService = inject(AuthService);

  // instancia o form com seus controls
  formRegister = new FormGroup({
    name: new FormControl("", [Validators.required]),
    cpf: new FormControl("", [Validators.required, this.cpfValidation]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required]),
  });

  /*
   *  UH1 : Campos incorretos
   */

  /*
   *  valida se todos os campos estão preenchidos [UH1]
   *  caso inválido : retorna "cpfNotValid" error
   *  caso válido : retorna null
   */

  cpfValidation(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;

    // Remove non-digit characters
    const cleanedCpf = cpf;

    // Validate the CPF length and common invalid patterns (e.g., all same digits)
    if (cleanedCpf.length !== 11 || !!cleanedCpf.match(/(\d)\1{10}/)) {
      return { cpfNotValid: true };
    }

    // CPF validation algorithm (Module 11)
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder == 10) || (remainder == 11)) {
      remainder = 0;
    }
    if (remainder != parseInt(cleanedCpf.substring(9, 10))) {
      return { cpfNotValid: true };
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder == 10) || (remainder == 11)) {
      remainder = 0;
    }
    if (remainder != parseInt(cleanedCpf.substring(10, 11))) {
      return { cpfNotValid: true };
    }

    return null; // CPF is valid
  }

  async submitForm() {
    /*
     *  valida se as senhas correspondem [UH1]
     *  caso inválido : envia toast com informações
     *  caso válido : retorna void
     */
    if (this.formRegister.value.password != this.formRegister.value.confirmPassword) {
      this.authService.toastService.add("Senhas diferentes!", "error")
      return;
    }

    // trata dados do usuário e instancia novo userData
    const userData: UserInterface = {
      "name": this.formRegister.value.name ?? "",
      "cpf": this.formRegister.value.cpf ?? "",
      "password": this.formRegister.value.password ?? ""
    }

    // envia novo usuário e recebe os dados de resposta
    const { data, status } = await this.authService.registerUser(userData)

    // cria novo toast com mensagem recebida [UH1]
    this.authService.toastService.add(
      data.message ?? "",
      this.authService.toastService.statusToType(status),
    )
  }
}
