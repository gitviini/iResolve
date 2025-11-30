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
        this.neighborhood = neighborhood;
        this.skills = skills;
        this.rating = rating;
        this.isVerified = isVerified;
        this.avatarUrl = avatarUrl;
        this.biography = biography;
    }

    public static UserResponseDTO toDTO(User user) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setName(user.getName());
        userResponseDTO.setCpf(user.getCpf());
        return userResponseDTO;
    }
}
