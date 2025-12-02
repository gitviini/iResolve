import { inject, Injectable } from '@angular/core';
import { UserProfile } from '../../models/interfaces/profile.interface';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)

  private url = "http://localhost:3000/users"

  private mockProfile: UserProfile = {
    id: '1',
    name: 'Vinicius Gabriel',
    email: 'vgsb@cesar.school',
    avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Vinicius',
    rating: 5.0,
    needsCount: 30,
    servicesCount: 15,
    cep: '50620-520',
    address: "Torre",
    status: 'AVAILABLE',
    // Exemplo de datas bloqueadas (formato ISO)
    blockedDates: ['2023-11-15', '2023-11-20'], 
    bio: 'Me chamo Vinicius Gabriel, curso ADS na Cesar School e adoro música.',
    skills: ['Pedreiro', 'Pintor'],
    myNeeds: [
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
  };

  private profile = new BehaviorSubject<UserProfile>(this.mockProfile);

  getProfile(nick ?: string) {
    if(nick){
      return this.http.get(`${this.url}/${nick}`);
    }

    return this.profile.asObservable();
  }

  async updateProfile(updatedData: UserProfile): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.mockProfile = updatedData;
    this.profile.next(this.mockProfile);
    return true;
  }

  // [UH11] Atualizado para aceitar string[]
  async updateAvailability(status: 'AVAILABLE' | 'BUSY', dates: string[]): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.mockProfile.status = status;
    this.mockProfile.blockedDates = dates;
    this.profile.next(this.mockProfile);
    return true;
  }
}