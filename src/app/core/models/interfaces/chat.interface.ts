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