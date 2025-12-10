import { inject, Injectable } from '@angular/core';
import { UserProfile } from '../../models/interfaces/profile.interface';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  private url = 'http://localhost:8080/users';

  /* private mockProfile: UserProfile = {
    name: '...',
    cpf: "...",
    nickname: "...",
    email: '...',
    avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Vinicius',
    rating: 0,
    needsCount: 0,
    servicesCount: 0,
    neighborhood: "",
    status: 'AVAILABLE',
    // Exemplo de datas bloqueadas (formato ISO)
    blockedDates: ['2023-11-15', '2023-11-20'],
    biography: "",
    skills: ['Pedreiro', 'Pintor'],
    needs: [
      {
        id: '101',
        title: 'Passear com cachorro',
        price: 100.00,
        address: "50620-520",
        skills: "Babá",
        cep: 'Torre',
        description: 'Preciso de alguém para passear com meu cachorro...',
        contractorNick: "vg",
        contractorName: 'Vinicius Gabriel',
        contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Vinicius',
        isVerified: true,
        images: ['https://placedog.net/500/280?id=1'],
        timePosted: 'Agora'
      }
    ]
  }; */

  private profile = new BehaviorSubject<UserProfile>(
    JSON.parse(localStorage.getItem('user') ?? '{}')
  );

  getProfile(nickname?: string) {
    const authToken = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const user: UserProfile = JSON.parse(localStorage.getItem('user') ?? '{}');
    return this.http.get(`${this.url}/${nickname ?? user.nickname}`, { headers: headers });
  }

  updateProfile(updatedData: UserProfile) {
    const authToken = localStorage.getItem('authToken');
    const headers = {
      "Authorization": `Bearer ${authToken}`,
      "Content-Type": "application/json",
    };

    const user: UserProfile = JSON.parse(localStorage.getItem('user') ?? '{}');
    return this.http.put(`${this.url}/${user.nickname}`, JSON.stringify(updatedData), { headers: headers });
  }

  // [UH11] Atualizado para aceitar string[]
  updateAvailability(status: 'AVAILABLE' | 'BUSY', dates: string[]) {
    const body = {
      status: status,
      blockedDates: dates,
    };
    const authToken = localStorage.getItem('authToken');
    const headers = {
      "Authorization": `Bearer ${authToken}`,
      "Content-Type": "application/json",
    };

    const user: UserProfile = JSON.parse(localStorage.getItem('user') ?? '{}');
    return this.http.put(`${this.url}/${user.nickname}`, JSON.stringify(body), { headers: headers });
  }
}
