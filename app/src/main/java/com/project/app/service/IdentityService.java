package com.project.app.service; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Import do seu DTO novo (na pasta user)
import com.project.app.dto.user.DocumentUploadDTO;

// Imports das Entidades e Enums
import com.project.app.entity.User;
import com.project.app.entity.enums.VerificationStatus;

// Imports de Repositório e Segurança

import com.project.app.repository.UserRepository; 
import com.project.app.usecase.jwt.JwtUseCase;

@Service
public class IdentityService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUseCase jwtUseCase;

    public void requestVerification(String token, DocumentUploadDTO dto) {
        // 1. Limpar o token (Tirar o prefixo "Bearer " se vier)
        String realToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        
        // 2. Extrair o CPF de dentro do token
        String cpf = jwtUseCase.extractCpf(realToken);
        
        // 3. Buscar o usuário dono desse CPF
        User user = userRepository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado para o CPF do token."));

        // 4. Atualizar os dados (Foto e Status)
        user.setDocumentImage(dto.getDocumentImageBase64());
        user.setVerificationStatus(VerificationStatus.PENDING);
        
        // 5. Salvar no banco
        userRepository.save(user);
    }
    
    // Método extra para simular a aprovação (útil para seus testes)
    public void approveByCpf(String cpf) {
        User user = userRepository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
        
        user.setVerificationStatus(VerificationStatus.APPROVED);
        user.setVerified(true); // Ativa o selo azul
        userRepository.save(user);
    }
}