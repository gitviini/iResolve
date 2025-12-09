import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../../core/components/navbar/navbar';
import { ChatService } from '../../../core/services/chat/chat.service';
import { ChatSummary } from '../../../core/models/interfaces/chat.interface';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, Navbar, RouterLink, FormsModule],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.css'
})

export class ChatList implements OnInit {
  chatService = inject(ChatService);
  router = inject(Router);

  conversations: ChatSummary[] = []; // Lista original (backup)g
  filteredConversations: ChatSummary[] = []; // Lista que aparece na tela
  searchTerm: string = ''; // Termo da busca

  ngOnInit(): void {
    this.chatService.getConversations().subscribe(data => {
      this.conversations = data;
      this.filteredConversations = data;
    });
  }

  // [NOVO] Função de filtragem
  filterChat() {
    const term = this.searchTerm.toLowerCase().trim();
    
    // Filtra pelo nome do usuário alvo (targetName)
    this.filteredConversations = this.conversations.filter(chat => 
      chat.targetName.toLowerCase().includes(term)
    );
  }

  // Navega para a conversa específica
  openChat(id: string) {
    // Por enquanto, como o ChatComponent é único e mockado, 
    // redireciona para a rota '/chat/room'
    this.router.navigate(['/chat/room']); 
  }
}