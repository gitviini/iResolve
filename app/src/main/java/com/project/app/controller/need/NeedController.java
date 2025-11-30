package com.project.app.controller.need;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.app.dto.need.NeedDTO;
import com.project.app.entity.Need;
import com.project.app.usecase.need.CreateNeedUseCase;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/needs")
public class NeedController {

    @Autowired
    private CreateNeedUseCase createNeedUseCase;

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
}