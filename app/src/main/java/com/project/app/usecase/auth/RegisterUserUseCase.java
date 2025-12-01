package com.project.app.usecase.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.text.Normalizer; // Import necessário para remover acentos

import com.project.app.dto.user.RegisterUserDTO;
import com.project.app.dto.user.UserResponseDTO;
import com.project.app.entity.User;
import com.project.app.exception.custom.UserAlreadyRegisteredException;
import com.project.app.repository.UserRepository;

/*
 * User register logic implement [UH1]
 */

@Service
public class RegisterUserUseCase {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserResponseDTO execute(RegisterUserDTO registerUserDTO){
        // caso usuário já exista, lança exception de usuário já registrado
        if(userRepository.findByCpf(registerUserDTO.getCpf()).isPresent()){
            throw new UserAlreadyRegisteredException();
        }

        // nova entidade a partir dos dados recebidos pelo front 
        User registerUser = registerUserDTO.toEntity(registerUserDTO);
        
        // --- LÓGICA NOVA: GERAR NICKNAME [UH5/UH12] ---
        // Gera um nickname único baseado no nome e salva no usuário
        String generatedNickname = generateUniqueNickname(registerUser.getName());
        registerUser.setNickname(generatedNickname);
        // -----------------------------------

        // codifica senha e armazena
        String passwordEncoded =  passwordEncoder.encode(registerUser.getPassword());

        // coloca senha codificada no usuário
        registerUser.setPassword(passwordEncoded);

        // tenta salvar usuário no banco de dados e recebe resposta (null or User)
        User registerUserCreated = userRepository.save(registerUser);
        
        // caso sucesso: manipula dados tornando-os adequada para resposta (User -> UserResponseDTO)
        return UserResponseDTO.toDTO(registerUserCreated);
    }

    // Método auxiliar privado para gerar nickname único
    private String generateUniqueNickname(String fullName) {
        if (fullName == null) return "user" + System.currentTimeMillis();

        // 1. Remove acentos e espaços (Ex: "Vinícius Gabriel" -> "vinicius.gabriel")
        String base = Normalizer.normalize(fullName, Normalizer.Form.NFD)
                .replaceAll("[\\p{InCombiningDiacriticalMarks}]", "")
                .toLowerCase()
                .trim()
                .replaceAll("\\s+", ".");
        
        // 2. Verifica se existe e adiciona número se necessário para evitar duplicatas
        String finalNickname = base;
        int count = 1;
        
        // O método existsByNickname foi criado no Passo 3 no UserRepository
        while (userRepository.existsByNickname(finalNickname)) {
            finalNickname = base + count; // ex: vinicius.gabriel1, vinicius.gabriel2...
            count++;
        }
        
        return finalNickname;
    }
}