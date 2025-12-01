package com.project.app.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DocumentUploadDTO {
    @NotBlank(message = "A imagem do documento é obrigatória")
    private String documentImageBase64;
}