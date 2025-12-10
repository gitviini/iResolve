export interface Contract {
    id: string;
    title: string;
    description: string;
    price: number;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    startDate: string;
    
    // Quem é a outra parte? (Se sou contratante, aqui aparece o prestador, e vice-versa)
    counterpartyName: string; 
    counterpartyAvatar: string;
    role: 'CONTRACTOR' | 'PROVIDER'; // Qual meu papel nesse contrato?
}