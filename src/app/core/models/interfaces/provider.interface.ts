export interface Provider {
    id: string;
    name: string;
    avatarUrl: string;
    rating: number; // 0 a 5
    location: string;
    skills: string[]; // Ex: ["Pedreiro", "Pintor"]
    isVerified: boolean;
}