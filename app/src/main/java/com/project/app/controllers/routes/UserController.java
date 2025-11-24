package com.project.app.controllers.routes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.app.dto.UserResponseDTO;
import com.project.app.models.entities.Users;
import com.project.app.models.repositories.UsersRepository;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping
    public ResponseEntity<?> searchProviders(
            @RequestParam(required = false) String term,  // O que digitou na busca
            @RequestParam(required = false) String skill, // Filtro de tag (ex: Pedreiro)
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size
    ) {
        try {
            PageRequest pageable = PageRequest.of(page, size);
            
            // Chama a busca no repositório
            Page<Users> result = usersRepository.searchProviders(term, skill, pageable);

            // Transforma a lista de Users (com senha) em UserResponseDTO (seguro)
            Page<UserResponseDTO> dtos = result.map(u -> new UserResponseDTO(
                u.getId(), u.getName(), u.getNeighborhood(), u.getSkills(), 
                u.getRating(), u.isVerified(), u.getAvatarUrl()
            ));

            return ResponseEntity.ok(dtos);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Falha ao pesquisar prestadores");
        }
    }
}