import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Ajuste a porta se necessário
  private apiUrl = 'http://localhost:8080/users';

  async searchProviders(term: string, skill: string, page: number): Promise<any> {
    try {
      // Monta a URL com parâmetros (ex: /users?page=0&size=30&term=Torre)
      const url = new URL(this.apiUrl);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('size', '30');
      
      if (term) url.searchParams.append('term', term);
      if (skill) url.searchParams.append('skill', skill);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Retorna o JSON da resposta (que é o Page do Spring)
      return await response.json();

    } catch (error) {
      console.error("Erro na busca:", error);
      throw error; // Repassa o erro para o componente tratar
    }
  }
}