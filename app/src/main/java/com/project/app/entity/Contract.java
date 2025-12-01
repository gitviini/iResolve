package com.project.app.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.project.app.entity.enums.ContractStatus;
import com.project.app.entity.enums.PaymentMethod;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "contracts")
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne // Uma necessidade gera um contrato
    @JoinColumn(name = "need_id", nullable = false)
    private Need need;

    @ManyToOne // Prestador pode ter vários contratos
    @JoinColumn(name = "provider_id", nullable = false)
    private User provider;

    @Column(nullable = false)
    private BigDecimal agreedValue; // Valor combinado (pode ser diferente do sugerido)

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    private ContractStatus status;

    private LocalDateTime createdAt;

    // CAMPOS DA UH7 (Histórico Financeiro)
    private BigDecimal platformFee; // Quanto a plataforma ganhou
    private BigDecimal netValue;    // Quanto o prestador recebeu
    
    private LocalDateTime finishedAt; // Quando acabou

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = ContractStatus.IN_ESCROW;
    }
}