package com.project.app.dto.user;

import com.project.app.entity.User;

import lombok.Data;

/*
 * Representa resposta de usuário [UH2]
 * 
 * !!!NÃO COLOCAR PASSWORD!!!
 */

@Data
public class UserResponseDTO {
    private String name;
    private String cpf;

    public static UserResponseDTO toDTO(User user) {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setName(user.getName());
        userResponseDTO.setCpf(user.getCpf());
        return userResponseDTO;
    }
}
