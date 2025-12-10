import { Injectable } from '@angular/core';
import { UserProfile } from '../models/interfaces/profile.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // Mock Inicial com todos os campos obrigatórios
  private mockProfile: UserProfile = {
    id: '1',
    name: 'Vinicius Gabriel',
    email: 'vgsb@cesar.school',
    avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Vinicius',
    rating: 5.0,
    needsCount: 30,
    servicesCount: 15,
    location: 'Torre - 50620-520',
    status: 'AVAILABLE',
    blockedDates: ['2023-11-15', '2023-11-20'], 
    bio: 'Me chamo Vinicius Gabriel, curso ADS na Cesar School e adoro música.',
    skills: ['Pedreiro', 'Pintor'],
    
    // Lista de vagas que eu criei
    myNeeds: [
      {
        id: '101',
        title: 'Passear com cachorro',
        price: 100.00,
        location: 'Torre',
        description: 'Preciso de alguém para passear com meu cachorro...',
        contractorName: 'Vinicius',
        contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Vinicius',
        isVerified: true,
        images: ['https://placedog.net/500/280?id=1'],
        timePosted: 'Agora'
      }
    ],

    // [CORREÇÃO] Lista de vagas que me candidatei (Preenche o requisito da Interface)
    myApplications: [
      {
        id: '202',
        title: 'Consertar Pia',
        price: 80.00,
        location: 'Madalena',
        description: 'Pia da cozinha com vazamento.',
        contractorName: 'Ana Silva',
        contractorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ana',
        isVerified: true,
        images: [],
        timePosted: '1d'
      }
    ]
  };

  private profile$ = new BehaviorSubject<UserProfile>(this.mockProfile);

  getProfile() {
    return this.profile$.asObservable();
  }

  async updateProfile(updatedData: UserProfile): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.mockProfile = updatedData;
    this.profile$.next(this.mockProfile);
    return true;
  }

  async updateAvailability(status: 'AVAILABLE' | 'BUSY', dates: string[]): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.mockProfile.status = status;
    this.mockProfile.blockedDates = dates;
    this.profile$.next(this.mockProfile);
    return true;
  }
}