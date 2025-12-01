package com.project.app.entity.enums;

public enum ContractStatus {
    PENDING_PAYMENT, // Aguardando pagamento
    IN_ESCROW,       // Pago e retido em garantia
    COMPLETED,       // Serviço feito e dinheiro liberado
    CANCELLED        // Cancelado
}