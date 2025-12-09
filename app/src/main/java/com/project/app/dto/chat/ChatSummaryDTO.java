package com.project.app.dto.chat;

import lombok.Data;

@Data
public class ChatSummaryDTO {
    private String id;           // ID do outro usuário (para navegação)
    private String targetName;   // Nome do outro usuário
    private String targetAvatar; // Foto
    private String lastMessage;  // Texto da última msg
    private String time;         // "27min", "1d"
    private int unreadCount;     // Badge
    private boolean isVerified;  // Selo azul
}