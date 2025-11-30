package com.project.app.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.app.dto.user.UserResponseDTO;
import com.project.app.dto.user.UserUpdateDTO;
import com.project.app.entity.User;
import com.project.app.repository.UserRepository;

import lombok.NonNull;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // --- UH5: BUSCAR PRESTADORES ---
    @GetMapping
    public ResponseEntity<?> searchProviders(
            @RequestParam(required = false) String term,
            @RequestParam(required = false) String skill,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size
    ) {
        try {
            PageRequest pageable = PageRequest.of(page, size);
            
            Page<User> result = userRepository.searchProviders(term, skill, pageable);

            // ATENÇÃO: Atualizamos este construtor para incluir CPF e Biografia (novos campos)
            Page<UserResponseDTO> dtos = result.map(u -> new UserResponseDTO(
                u.getId(), 
                u.getName(), 
                u.getCpf(),           // Novo
                u.getNeighborhood(), 
                u.getSkills(), 
                u.getRating(), 
                u.isVerified(), 
                u.getAvatarUrl(),
                u.getBiography()      // Novo
            ));

            return ResponseEntity.ok(dtos);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Falha ao pesquisar prestadores");
        }
    }

    // --- UH12: VER PERFIL ---
    @GetMapping("/{id}")
    public ResponseEntity<?> getProfile(@PathVariable UUID id) {
        Optional<User> userOpt = userRepository.findById(id);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }

        User u = userOpt.get();
        
        return ResponseEntity.ok(new UserResponseDTO(
            u.getId(), u.getName(), u.getCpf(), u.getNeighborhood(), u.getSkills(), 
            u.getRating(), u.isVerified(), u.getAvatarUrl(), u.getBiography()
        ));
    }

    // --- UH12: ATUALIZAR PERFIL ---
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable @NonNull UUID id, @RequestBody UserUpdateDTO data) {
        Optional<User> userOpt = userRepository.findById(id);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }

        User user = userOpt.get();

        // Atualiza apenas se o dado foi enviado (não é nulo)
        if (data.getName() != null) user.setName(data.getName());
        if (data.getNeighborhood() != null) user.setNeighborhood(data.getNeighborhood());
        if (data.getBiography() != null) user.setBiography(data.getBiography());
        if (data.getSkills() != null) user.setSkills(data.getSkills());
        if (data.getAvatarUrl() != null) user.setAvatarUrl(data.getAvatarUrl());

        userRepository.save(user);

        return ResponseEntity.ok(new UserResponseDTO(
            user.getId(), user.getName(), user.getCpf(), user.getNeighborhood(), user.getSkills(), 
            user.getRating(), user.isVerified(), user.getAvatarUrl(), user.getBiography()
        ));
    }
}