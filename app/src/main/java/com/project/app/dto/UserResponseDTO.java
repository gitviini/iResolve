package com.project.app.dto;

import java.util.UUID;
import lombok.Data;

@Data
public class UserResponseDTO {
    private UUID id;
    private String name;
    private String neighborhood;
    private String skills;
    private Double rating;
    private boolean isVerified;
    private String avatarUrl;

    // Construtor para facilitar a conversão
    public UserResponseDTO(UUID id, String name, String neighborhood, String skills, Double rating, boolean isVerified, String avatarUrl) {
        this.id = id;
        this.name = name;
        this.neighborhood = neighborhood;
        this.skills = skills;
        this.rating = rating;
        this.isVerified = isVerified;
        this.avatarUrl = avatarUrl;
    }
}