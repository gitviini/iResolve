import { inject, Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';
import { VerificationResponse } from '../models/interfaces/verification.interface';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  toastService = inject(ToastService);
  authService = inject(AuthService);

  private apiUrl = "http://localhost:8080/verification"; // Ajuste conforme backend

  // Simulação de status (enquanto não tem backend real)
  // No futuro, isso viria do GET /verification/status
  currentStatus: VerificationResponse = { status: 'NONE' };

  async uploadDocument(file: File): Promise<boolean> {
    const formData = new FormData();
    formData.append('document', file);
    
    // Adiciona o ID do usuário se necessário, ou o backend pega pelo Token
    // formData.append('userId', ...);

    try {
      // Simulação de chamada de API
      // const response = await fetch(`${this.apiUrl}/upload`, {
      //   method: 'POST',
      //   headers: { 'Authorization': `Bearer ${this.authService.isLogged()}` },
      //   body: formData
      // });
      
      // MOCK para testar visualmente (Remova quando tiver backend)
      await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay
      
      this.currentStatus = { status: 'PENDING' }; // Atualiza status localmente
      return true;

    } catch (error) {
      return false;
    }
  }

  // Método para buscar o status atual ao carregar a página
  async getStatus(): Promise<VerificationResponse> {
    // Aqui faria um fetch GET
    return this.currentStatus;
  }
}