import { Component, ElementRef, inject, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../core/services/chat/chat.service';
import { ChatMessage, ChatUser } from '../../core/models/interfaces/chat.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked {
  chatService = inject(ChatService);
  router = inject(Router);

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages: ChatMessage[] = [];
  targetUser!: ChatUser;
  newMessage = '';

  ngOnInit(): void {
    this.targetUser = this.chatService.getTargetUser();
    
    // Inscreve-se para receber atualizações de mensagens
    this.chatService.getMessages().subscribe(msgs => {
      this.messages = msgs;
    });
  }

  // Rola para o fim sempre que a view muda (nova mensagem)
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = ''; // Limpa input
    }
  }

  goToPayment() {
    this.router.navigate(['/payment']);
  }

  goBack() {
    this.router.navigate(['/chat']);
  }
}