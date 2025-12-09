export interface ChatMessage {
    id: string;
    senderId: string; // 'ME' ou 'OTHER'
    text?: string;
    imageUrl?: string; // Opcional, para fotos
    timestamp: Date;
    isServiceCard?: boolean; // Para renderizar aquele card de "Passear com cachorro"
}

export interface ChatUser {
    name: string;
    avatarUrl: string;
    isVerified: boolean;
}

export interface ChatSummary {
    id: string;
    targetName: string;
    targetAvatar: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    isVerified: boolean;
}