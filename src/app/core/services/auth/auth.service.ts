import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../../models/interfaces/user.interface';
import { LoginInterface } from '../../models/interfaces/login.interface';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  toastService = inject(ToastService);

  // URL base (ajuste se necessário, ex: http://localhost:8080)
  // TODO : trocar link em produção
  private url = "http://localhost:8080/auth";

  /**
   * Verifica se usuário está logado
   * Retorna o token se existir
   */
  isLogged(){
    return localStorage.getItem("authToken");
  }

  // [UH2] Método de Login
  async login(credentials: LoginInterface): Promise<{data: any, status: number}> {
    try {
      const response = await fetch(`${this.url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
      });
      
      return ({ data: await response.json() ?? {}, status: response.status });
    }
    catch(error){
      return {data: {message: "Não foi possível conectar ao servidor."}, status: 500};
    }
  }

  // [UH1] Registrar usuário
  async registerUser(userData: UserInterface): Promise<{data: any, status: number}> {
    try{
      const data = await fetch(`${this.url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      });
      
      return ({ data: await data.json() ?? {}, status: data.status ?? 500});
    }
    catch(error){
      return {data: {message: "Não foi possível realizar a ação! Tente novamente."}, status: 500};
    }
  }

  logout(){
    localStorage.removeItem("authToken");
  }
}