package com.project.app.usecase.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.text.Normalizer;

import com.project.app.dto.user.RegisterUserDTO;
import com.project.app.dto.user.UserResponseDTO;
import com.project.app.entity.User;
import com.project.app.exception.custom.UserAlreadyRegisteredException;
import com.project.app.repository.UserRepository;

@Service
public class RegisterUserUseCase {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserResponseDTO execute(RegisterUserDTO registerUserDTO){
        if(userRepository.findByCpf(registerUserDTO.getCpf()).isPresent()){
            throw new UserAlreadyRegisteredException();
        }

        User registerUser = registerUserDTO.toEntity(registerUserDTO);
        
        // --- GERAÇÃO DE NICKNAME (Obrigatório para UH6) ---
        String generatedNickname = generateUniqueNickname(registerUser.getName());
        registerUser.setNickname(generatedNickname);
        // --------------------------------------------------

        String passwordEncoded = passwordEncoder.encode(registerUser.getPassword());
        registerUser.setPassword(passwordEncoded);

        User registerUserCreated = userRepository.save(registerUser);
        
        return UserResponseDTO.toDTO(registerUserCreated);
    }

    private String generateUniqueNickname(String fullName) {
        if (fullName == null) return "user" + System.currentTimeMillis();

        String base = Normalizer.normalize(fullName, Normalizer.Form.NFD)
                .replaceAll("[\\p{InCombiningDiacriticalMarks}]", "")
                .toLowerCase()
                .trim()
                .replaceAll("\\s+", ".");
        
        String finalNickname = base;
        int count = 1;
        
        // Garante que não duplica
        while (userRepository.findByNickname(finalNickname).isPresent()) { // Usando findByNickname ou existsByNickname
            finalNickname = base + count;
            count++;
        }
        
        return finalNickname;
    }
}