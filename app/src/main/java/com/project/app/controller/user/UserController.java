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

            // CORREÇÃO: Usamos o método 'toDTO' em vez de 'new UserResponseDTO(...)'
            // Isso evita erros de contagem de argumentos!
            Page<UserResponseDTO> dtos = result.map(UserResponseDTO::toDTO);

            return ResponseEntity.ok(dtos);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Falha ao pesquisar prestadores");
        }
    }

    // --- UH12: VER PERFIL ---
    @GetMapping("/{nickname}")
    public ResponseEntity<?> getProfile(@PathVariable String nickname) {
        Optional<User> userOpt = userRepository.findByNickname(nickname);

        // Fallback para ID se não achar por nickname
        if (userOpt.isEmpty()) {
            try {
                UUID id = UUID.fromString(nickname);
                userOpt = userRepository.findById(id);
            } catch (IllegalArgumentException e) {
                // Ignora
            }
        }

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }

        // CORREÇÃO: Usando toDTO aqui também
        return ResponseEntity.ok(UserResponseDTO.toDTO(userOpt.get()));
    }

    // --- UH12: ATUALIZAR PERFIL ---
    @PutMapping("/{nickname}")
    public ResponseEntity<?> updateProfile(@PathVariable String nickname, @RequestBody UserUpdateDTO data) {
        Optional<User> userOpt = userRepository.findByNickname(nickname);

        if (userOpt.isEmpty()) {
            try {
                UUID id = UUID.fromString(nickname);
                userOpt = userRepository.findById(id);
            } catch (IllegalArgumentException e) {
                // Ignora
            }
        }

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }

        User user = userOpt.get();

        // Atualiza apenas se o dado foi enviado
        if (data.getName() != null) user.setName(data.getName());
        if (data.getNeighborhood() != null) user.setNeighborhood(data.getNeighborhood());
        if (data.getBiography() != null) user.setBiography(data.getBiography());
        if (data.getSkills() != null) user.setSkills(data.getSkills());
        if (data.getAvatarUrl() != null) user.setAvatarUrl(data.getAvatarUrl());

        userRepository.save(user);

        return ResponseEntity.ok(UserResponseDTO.toDTO(user));
    }
}