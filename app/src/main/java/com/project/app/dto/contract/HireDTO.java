package com.project.app.dto.contract;

import java.math.BigDecimal;
import java.util.UUID;

import com.project.app.entity.enums.PaymentMethod;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HireDTO {
    @NotNull
    private UUID needId; // Qual necessidade está sendo contratada
    
    @NotNull
    private String providerNickname; // Quem está sendo contratado
    
    @NotNull
    private BigDecimal value; // Quanto está sendo pago
    
    @NotNull
    private PaymentMethod paymentMethod; // PIX ou CARTAO
}