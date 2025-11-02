package com.project.app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// @Data (do Lombok) vai criar os getters e setters para nós.
@Data
public class UserDTO {

    // @NotBlank garante que o campo não seja nulo nem uma string vazia ("").
    // Se for, a API retornará um erro 400 (Bad Request) automaticamente.
    @NotBlank(message = "O campo 'name' não pode estar vazio")
    private String name;

    @NotBlank(message = "O campo 'cpf' não pode estar vazio")
    private String cpf;

    @NotBlank(message = "O campo 'password' não pode estar vazio")
    private String password;
}