package com.project.app.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 50, unique = true)
    private String nickname;

    @Column(length = 11, nullable = false, unique = true)
    private String cpf;

    @Column(length = 60)
    private String password;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private LocalDateTime createdAt;

    @CreationTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    private String neighborhood; // Ex: "Torre"

    private String skills; // Ex: "Pedreiro, Pintor"

    private Double rating; // Ex: 4.5

    private boolean isVerified; // Para o selo azul

    @Column(columnDefinition = "TEXT")
    private String avatarUrl; // Foto do perfil (Base64 ou URL)

    @Column(columnDefinition = "TEXT")
    private String biography;

}
