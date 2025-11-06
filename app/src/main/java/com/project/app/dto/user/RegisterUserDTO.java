package com.project.app.dto.user;

import com.project.app.entity.User;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// @Data (do Lombok) vai criar os getters e setters para nós.
@Data
public class RegisterUserDTO {

    // @NotBlank garante que o campo não seja nulo nem uma string vazia ("").
    // Se for, a API retornará um erro 400 (Bad Request) automaticamente.
    @NotBlank(message = "O campo 'name' não pode estar vazio")
    private String name;

    @NotBlank(message = "O campo 'cpf' não pode estar vazio")
    private String cpf;

    @NotBlank(message = "O campo 'password' não pode estar vazio")
    private String password;

    // converte DTO para User
    public User toEntity(RegisterUserDTO registerUserDTO){
        User user = new User();
        user.setName(registerUserDTO.getName());
        user.setCpf(registerUserDTO.getCpf());
        user.setPassword(registerUserDTO.getPassword());

        return user;
    }
}
