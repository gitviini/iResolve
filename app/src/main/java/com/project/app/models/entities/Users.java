package com.project.app.models.entities;

import java.util.UUID;
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
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(length = 11, nullable = false, unique = true)
    private String cpf;

    @Column(length = 25)
    private String password;

    // TODO: A senha aqui tem length = 25, o que é muito pouco para
    // uma senha criptografada (hash). Verificar isso depois.

    // ... E TODOS OS GETTERS E SETTERS FORAM APAGADOS
    // O @Data cuida disso
}