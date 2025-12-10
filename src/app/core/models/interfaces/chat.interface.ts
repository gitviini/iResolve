export interface ChatMessage {
    id: string;
    senderId: string;
    text?: string;
    imageUrl?: string; 
    timestamp: Date;
    
    // [NOVOS CAMPOS UH15]
    isServiceCard?: boolean; 
    serviceDetails?: {
        title: string;
        price: number;
        location: string;
        shortDesc: string;
    };
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