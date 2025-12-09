package com.project.app.usecase.chat;

import com.project.app.dto.chat.ChatSummaryDTO;
import com.project.app.entity.Message;
import com.project.app.entity.User;
import com.project.app.repository.MessageRepository;
import com.project.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ListConversationsUseCase {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    public List<ChatSummaryDTO> execute(String myCpf) {
        // 1. Quem sou eu?
        User me = userRepository.findByCpf(myCpf)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // 2. Busca TODAS as mensagens que participei
        List<Message> allMessages = messageRepository.findConversationsByUser(me);

        // 3. Agrupar por "Outro Usuário" para encontrar a conversa
        // Usa um Map para garantir que só pega a ÚLTIMA mensagem de cada par
        Map<UUID, Message> uniqueConversations = new LinkedHashMap<>();

        for (Message msg : allMessages) {
            // Identifica quem é a "outra pessoa" da conversa
            User otherUser = msg.getSender().getId().equals(me.getId()) ? msg.getReceiver() : msg.getSender();
            
            // Como a query já ordena por DATA DESC, o primeiro encontro é a última mensagem
            uniqueConversations.putIfAbsent(otherUser.getId(), msg);
        }

        // 4. Transformar em DTOs
        List<ChatSummaryDTO> result = new ArrayList<>();

        for (Message msg : uniqueConversations.values()) {
            User otherUser = msg.getSender().getId().equals(me.getId()) ? msg.getReceiver() : msg.getSender();

            ChatSummaryDTO dto = new ChatSummaryDTO();
            dto.setId(otherUser.getNickname());
            dto.setTargetName(otherUser.getName());
            dto.setTargetAvatar(otherUser.getAvatarUrl());
            dto.setVerified(otherUser.isVerified());
            
            // Lógica da mensagem
            String prefix = msg.getSender().getId().equals(me.getId()) ? "Você: " : "";
            dto.setLastMessage(prefix + msg.getContent());
            
            dto.setTime(formatTime(msg.getSentAt()));

            if (!msg.isRead() && msg.getReceiver().getId().equals(me.getId())) {
                // Se a última msg não foi lida e foi pra mim, marca como 1
                dto.setUnreadCount(1); 
            } else {
                dto.setUnreadCount(0);
            }

            result.add(dto);
        }

        return result;
    }

    private String formatTime(LocalDateTime sentAt) {
        Duration diff = Duration.between(sentAt, LocalDateTime.now());
        long minutes = diff.toMinutes();
        
        if (minutes < 60) return minutes + "min";
        if (minutes < 1440) return (minutes / 60) + "h";
        return (minutes / 1440) + "d";
    }
}