export interface NeedInterface {
    id?: string;
    title: string;
    description: string;
    category: string;
    value: number;
    location: string;
    images: File[];
    status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
}