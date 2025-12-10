package com.project.app.controller.need;

import java.util.HashMap;
import java.util.Map;

import java.util.UUID; // [Importante]
import java.util.Optional; // [Importante]

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.project.app.controller.user.UserController;
import com.project.app.dto.need.NeedDTO;
import com.project.app.dto.user.UserResponseDTO;
import com.project.app.entity.Need;
import com.project.app.entity.User;
import com.project.app.repository.NeedRepository;
import com.project.app.usecase.need.CreateNeedUseCase;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/needs")
public class NeedController {

    private final UserController userController;

    @Autowired
    private CreateNeedUseCase createNeedUseCase;

    NeedController(UserController userController) {
        this.userController = userController;
    }

    @PostMapping
    public ResponseEntity<?> createNeed(@Valid @RequestBody NeedDTO needDTO) {
        try {
            Need createdNeed = createNeedUseCase.execute(needDTO);

            // Sucesso (201 Created)
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Necessidade criada com sucesso!");
            response.put("needId", createdNeed.getId());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (IllegalStateException e) {
            // Erro de Negócio (409 Conflict) - "Necessidade já existe"
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);

        } catch (Exception e) {
            // Erro Geral (500 Internal Server Error)
            Map<String, String> error = new HashMap<>();
            error.put("message", "Falha ao publicar necessidade: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @Autowired
    private NeedRepository needRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> getNeedById(@PathVariable UUID id) {
        try {
            Optional<Need> needOptional = needRepository.findById(id);

            if (needOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Necessidade não encontrada."));
            }

            Need need = needOptional.get();
            return ResponseEntity.ok(NeedDTO.toDTO(need));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Erro ao buscar necessidade: " + e.getMessage()));
        }
    }

}