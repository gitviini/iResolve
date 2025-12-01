package com.project.app.controller.routes; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.app.dto.user.DocumentUploadDTO; // DTO na pasta user
import com.project.app.service.IdentityService;    // Service

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/identity")
public class IdentityController {

    @Autowired
    private IdentityService identityService;

    // Rota para o PRESTADOR enviar o documento
    // POST /identity/verify
    // Exige Header: Authorization: Bearer <token>
    @PostMapping("/verify")
    public ResponseEntity<?> requestVerification(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody DocumentUploadDTO dto) {
        
        try {
            identityService.requestVerification(token, dto);
            return ResponseEntity.ok(Map.of("message", "Documento enviado com sucesso! Perfil em análise."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // Rota de ADMIN (Simulação para testes)
    // POST /identity/approve/cpf/{cpf}
    @PostMapping("/approve/cpf/{cpf}")
    public ResponseEntity<?> approveUserByCpf(@PathVariable String cpf) {
        try {
            identityService.approveByCpf(cpf);
            return ResponseEntity.ok(Map.of("message", "Usuário aprovado e verificado com sucesso!"));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }
}