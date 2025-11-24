import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NeedService {
  // Ajuste a porta se o back-end estiver em outra (ex: 8080)
  private apiUrl = 'http://localhost:8080/needs';
  private viaCepUrl = 'https://viacep.com.br/ws';

  // [UH3] Buscar Endereço automático (ViaCEP)
  async getAddressByCep(cep: string): Promise<any> {
    try {
      const cleanCep = cep.replace(/\D/g, ''); // Remove traços/pontos
      if (!cleanCep) return { erro: true };

      const response = await fetch(`${this.viaCepUrl}/${cleanCep}/json/`);
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
      return { erro: true };
    }
  }

  // [UH3] Publicar Necessidade
  // Segue o padrão do AuthService: retorna { data, status }
  async publishNeed(needData: any): Promise<{ data: any, status: number }> {
    try {
      // Enviaria o token de autenticação no header se necessário
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(needData)
      });

      // Se a resposta for 204 (No Content) ou vazia, evita erro no .json()
      const data = response.status !== 204 ? await response.json().catch(() => ({})) : {};

      return {
        data: data,
        status: response.status
      };

    } catch (error) {
      return {
        data: { message: "Não foi possível conectar ao servidor." },
        status: 500
      };
    }
  }
}