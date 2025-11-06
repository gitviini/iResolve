package com.project.app.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

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

    @Column(length = 11, nullable = false, unique = true)
    private String cpf;

    @Column(length = 60)
    private String password;

    @CreationTimestamp
    private LocalDateTime created_at;

    @CreationTimestamp
    private LocalDateTime updated_at;

    // TODOS OS GETTERS E SETTERS FORAM APAGADOS
    // O @Data cuida disso
}
