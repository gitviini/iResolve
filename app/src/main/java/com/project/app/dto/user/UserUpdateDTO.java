package com.project.app.dto.user;

import lombok.Data;

@Data
public class UserUpdateDTO {
    private String name;
    private String neighborhood; // Localização
    private String biography;    // Sobre mim
    private String skills;       // Habilidades (ex: "Pedreiro,Pintor")
    private String avatarUrl;    // Foto (Base64)
}