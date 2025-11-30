package com.project.app.dto.need;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class NeedDTO {

    @NotBlank(message = "O CPF do usuário é obrigatório")
    private String userCpf;

    @NotBlank(message = "O título é obrigatório")
    private String title;

    @NotBlank(message = "A descrição é obrigatória")
    private String description;

    @NotNull(message = "O valor sugerido é obrigatório")
    private BigDecimal value;

    private String category;

    private List<String> tags;

    private String cep;
    private String address;

    private String imageBase64;
}