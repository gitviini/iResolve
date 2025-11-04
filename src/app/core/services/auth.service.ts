import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../models/interfaces/user.interface';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
/*
 *  Serviço de Autenticação de usuário [UH1]
 */

export class AuthService {
  toastService = inject(ToastService);

  private url = "http://localhost:8080/auth/users";

  // registrar usuário [UH1]
  async registerUser(userData: UserInterface): Promise<{data: any, status: number}> {
    const data = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    });

    return ({ data: await data.json() ?? {}, status: data.status ?? 500});
  }
}
