package com.project.app.dto.user;

import com.project.app.entity.User;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Representa os dados do usuário no login (cpf, password) [UH2]
 */

@Data
public class LoginUserDTO {
    @NotBlank(message = "O campo 'cpf' não pode estar vazio")
    private String cpf;

    @NotBlank(message = "O campo 'password' não pode estar vazio")
    private String password;

    // converte DTO para User
    public User toEntity(LoginUserDTO loginUserDTO) {
        User user = new User();
        user.setCpf(loginUserDTO.getCpf());
        user.setPassword(loginUserDTO.getPassword());

        return user;
    }
}
