package com.project.app.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import com.project.app.entity.enums.NeedStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Data
@Entity
@Table(name = "tb_needs")
public class Need {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000) // Permite descrições longas
    private String description;

    @Column(name = "suggested_value", nullable = false) // MUDANÇA AQUI
    private BigDecimal value;

    private String category;
    private String tags; // Vamos salvar as tags separadas por vírgula (ex: "Casa,Limpeza")

    private String cep;
    private String address;

    @Column(columnDefinition = "TEXT") // Base64 é gigante, precisa ser TEXT
    private String imageBase64;

    private LocalDateTime createdAt;

    // Relacionamento: Muitas necessidades pertencem a UM usuário (Users)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @Enumerated(EnumType.STRING)
    private NeedStatus status = NeedStatus.OPEN;
}