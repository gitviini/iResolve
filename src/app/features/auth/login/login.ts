import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginInterface } from '../../../core/models/interfaces/login.interface';
// Importando o efeito que você já criou no Register
import carrosselEffect from '../register/carrosselEffect'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  formLogin = new FormGroup({
    cpf: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  ngOnInit(): void {
    // Checklist: Se já logado, manda para home
    if (this.authService.isLogged()) {
      this.router.navigate(['/']);
    }
    // Ativa o carrossel visual
    carrosselEffect(); 
  }

  async submitForm() {
    // Validação básica
    if (this.formLogin.invalid) {
      this.authService.toastService.add("Preencha todos os campos!", "warning");
      return;
    }

    const credentials: LoginInterface = {
      cpf: this.formLogin.value.cpf ?? "",
      password: this.formLogin.value.password ?? ""
    };

    // Chama o serviço
    const { data, status } = await this.authService.login(credentials);

    // Sucesso (Status 200 a 299)
    if (status >= 200 && status < 300) {
      // Salva o token e redireciona
      if (data.token && data.user) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      };
      
      this.authService.toastService.add("Login realizado com sucesso!", "sucess");
      this.router.navigate(['/']); 
    }
     
    // Erro
    else {
      const message = data.message || "Erro ao realizar login.";
      this.authService.toastService.add(message, "error");
    }
  }
}