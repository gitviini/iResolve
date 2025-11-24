package com.project.app.dto;

import java.util.UUID;
import lombok.Data;

@Data
public class UserResponseDTO {
    private UUID id;
    private String name;
    private String cpf; // Adicionado
    private String neighborhood;
    private String skills;
    private Double rating;
    private boolean isVerified;
    private String avatarUrl;
    private String biography; // Adicionado

    public UserResponseDTO(UUID id, String name, String cpf, String neighborhood, String skills, Double rating, boolean isVerified, String avatarUrl, String biography) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.neighborhood = neighborhood;
        this.skills = skills;
        this.rating = rating;
        this.isVerified = isVerified;
        this.avatarUrl = avatarUrl;
        this.biography = biography;
    }
}