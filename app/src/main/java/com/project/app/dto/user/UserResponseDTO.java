package com.project.app.dto.user;

import java.util.UUID;
import com.project.app.entity.User;
import lombok.Data;

@Data
public class UserResponseDTO {
    private UUID id;
    private String name;
    private String cpf;
    private String nickname;
    private String neighborhood;
    private String skills;
    private Double rating;
    private boolean isVerified;
    private String avatarUrl;
    private String biography;

    // Construtor vazio necessário para o Jackson/Spring
    public UserResponseDTO() {}

    // Método que converte a Entidade do banco para este DTO
    public static UserResponseDTO toDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setCpf(user.getCpf());
        dto.setNickname(user.getNickname()); // Importante para a UH6
        
        dto.setNeighborhood(user.getNeighborhood());
        dto.setSkills(user.getSkills());
        dto.setRating(user.getRating());
        dto.setVerified(user.isVerified());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setBiography(user.getBiography());
        
        return dto;
    }
}