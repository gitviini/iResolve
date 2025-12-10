package com.project.app.dto.user;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class UserUpdateDTO {
    private String name;
    private String neighborhood; // Localização
    private String biography;    // Sobre mim
    private List<String> skills;       // Habilidades (ex: "Pedreiro,Pintor")
    private String avatarUrl;    // Foto (Base64)
    private String status;
    private List<LocalDate> blockedDates;
}