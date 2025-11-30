import { Injectable } from '@angular/core';
import { ChatMessage, ChatUser } from '../../models/interfaces/chat.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Mock do Usuário com quem estamos falando
  targetUser: ChatUser = {
    name: 'Jorge Lucio',
    avatarUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jorge',
    isVerified: true
  };

  // Histórico Inicial (Mock)
  private initialMessages: ChatMessage[] = [
    {
      id: '1',
      senderId: 'ME',
      timestamp: new Date(),
      isServiceCard: true // O card de contexto do serviço
    },
    {
      id: '2',
      senderId: 'ME',
      text: 'Olá, que horas seria o passeio?',
      timestamp: new Date()
    },
    {
      id: '3',
      senderId: 'OTHER',
      text: 'As 8hrs e as 16hrs',
      timestamp: new Date()
    }
  ];

  // Observable para o componente "assistir" as mensagens
  messages$ = new BehaviorSubject<ChatMessage[]>(this.initialMessages);

  getMessages() {
    return this.messages$.asObservable();
  }

  getTargetUser() {
    return this.targetUser;
  }

  // Envia mensagem e simula resposta
  sendMessage(text: string) {
    const currentMsgs = this.messages$.value;
    
    // Adiciona minha mensagem
    const myMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'ME',
      text: text,
      timestamp: new Date()
    };

    this.messages$.next([...currentMsgs, myMsg]);

    // Simula resposta automática após 1.5s
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'OTHER',
        text: 'Certo! Combinado.',
        timestamp: new Date()
      };
      this.messages$.next([...this.messages$.value, reply]);
    }, 1500);
  }
}