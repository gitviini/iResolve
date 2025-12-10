package com.project.app.dto.user;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import com.project.app.entity.User;
import lombok.Data;
import com.project.app.entity.Need;

@Data
public class UserResponseDTO {
    private UUID id;
    private String name;
    private String email;
    private String cpf;
    private String nickname;
    private String status;
    private List<LocalDate> blockedDates;
    private String neighborhood;
    private List<String> skills;
    private Double servicesCount;
    private Double needsCount;
    private Double rating;
    private boolean isVerified;
    private String avatarUrl;
    private String biography;
    private List<Need> needs;

    // Construtor vazio necessário para o Jackson/Spring
    public UserResponseDTO() {
    }

    // Método que converte a Entidade do banco para este DTO
    public static UserResponseDTO toDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setName(user.getName());
        dto.setCpf(user.getCpf());
        dto.setEmail(user.getEmail());
        dto.setNickname(user.getNickname()); // Importante para a UH6

        dto.setStatus(user.getStatus());
        dto.setBlockedDates(user.getBlockedDates());
        dto.setNeighborhood(user.getNeighborhood());
        dto.setSkills(user.getSkills());
        dto.setRating(user.getRating());
        dto.setServicesCount(user.getServicesCount());
        dto.setNeedsCount(user.getNeedsCount());
        dto.setVerified(user.isVerified());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setBiography(user.getBiography());

        return dto;
    }

    // Converte a Entidade do banco para este DTO junto com suas Needs
    public static UserResponseDTO toDTO(User user, List<Need> needs) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setName(user.getName());
        dto.setCpf(user.getCpf());
        dto.setEmail(user.getEmail());
        dto.setNickname(user.getNickname()); // Importante para a UH6

        dto.setStatus(user.getStatus());
        dto.setBlockedDates(user.getBlockedDates());
        dto.setNeighborhood(user.getNeighborhood());
        dto.setSkills(user.getSkills());
        dto.setRating(user.getRating());
        dto.setServicesCount(user.getServicesCount());
        dto.setNeedsCount(user.getNeedsCount());
        dto.setVerified(user.isVerified());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setBiography(user.getBiography());
        dto.setNeeds(needs);

        return dto;
    }
}