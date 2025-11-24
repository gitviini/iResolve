import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/users';

  // Busca dados do usuário pelo ID
  async getProfile(id: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    return await response.json();
  }

  // Atualiza dados do usuário
  async updateProfile(id: string, data: any): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.status !== 200) throw new Error('Erro ao atualizar');
    return await response.json();
  }
}