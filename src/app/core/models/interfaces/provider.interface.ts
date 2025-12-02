export interface Provider {
    id: string;
    nickname: string;
    name: string;
    avatarUrl: string;
    rating: number; // 0 a 5
    location: string;
    neighborhood: string;
    skills: string; // Ex: ["Pedreiro", "Pintor"]
    isVerified: boolean;
}