package com.project.app.dto.user;

import java.util.UUID;

import com.project.app.entity.User;

import lombok.Data;

/*
 * Representa resposta de usuário [UH2]
 * 
 * !!!NÃO COLOCAR PASSWORD!!!
 */
@Data
public class UserResponseDTO {
    private UUID id;
    private String name;
    private String cpf;
    private String nickname; // NOVO
    private String neighborhood;
    private String skills;
    private Double rating;
    private boolean isVerified;
    private String avatarUrl;
    private String biography;

    public UserResponseDTO() {}

    public UserResponseDTO(UUID id, String name, String cpf, String neighborhood, String skills, Double rating,
            boolean isVerified, String avatarUrl, String biography) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.nickname = nickname; // Adicionado
        this.neighborhood = neighborhood;
        this.skills = skills;
        this.rating = rating;
        this.isVerified = isVerified;
        this.avatarUrl = avatarUrl;
        this.biography = biography;
    }

    // Método estático para converter Entity -> DTO
    public static UserResponseDTO toDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        
        // Copia TODOS os dados do usuário para a resposta
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setCpf(user.getCpf());
        dto.setNickname(user.getNickname()); // O mais importante agora!
        
        dto.setNeighborhood(user.getNeighborhood());
        dto.setSkills(user.getSkills());
        dto.setRating(user.getRating());
        dto.setVerified(user.isVerified());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setBiography(user.getBiography());
        
        return dto;
    }
}
