import { Injectable } from '@angular/core';
import { ChatMessage, ChatUser, ChatSummary } from '../../models/interfaces/chat.interface'; // [NOVO] Import do ChatSummary
import { BehaviorSubject, Observable, of } from 'rxjs'; // [NOVO] Import do 'of'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Mock do Usuário com quem estamos falando (na tela de conversa individual)
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

  // --- [NOVO] LÓGICA DA LISTA DE CONVERSAS (HUB) ---

  // Mock da lista
  private mockConversations: ChatSummary[] = [
    {
      id: '1',
      targetName: 'Jorge',
      targetAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Jorge',
      lastMessage: 'Passear com cachorro',
      time: '27min',
      unreadCount: 0,
      isVerified: true
    },
    {
      id: '2',
      targetName: 'Maria',
      targetAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Maria',
      lastMessage: 'Cuidar de Hamster',
      time: '1h10min',
      unreadCount: 0,
      isVerified: false
    },
    {
      id: '3',
      targetName: 'Matheus',
      targetAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Matheus',
      lastMessage: 'Olá, tudo bem?',
      time: '2d',
      unreadCount: 3,
      isVerified: true
    }
  ];

  // --- MÉTODOS ---

  // [NOVO] Retorna a lista de conversas
  getConversations(): Observable<ChatSummary[]> {
    // Retorna os dados mockados como um Observable (simulando API)
    return of(this.mockConversations);
  }

  // Retorna as mensagens do chat atual
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