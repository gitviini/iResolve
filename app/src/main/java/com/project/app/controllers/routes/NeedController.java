package com.project.app.controllers.routes;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.app.dto.NeedDTO;
import com.project.app.models.entities.Need;
import com.project.app.services.NeedService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/needs")
public class NeedController {

    @Autowired
    private NeedService needService;

    @PostMapping
    public ResponseEntity<?> createNeed(@Valid @RequestBody NeedDTO needDTO) {
        try {
            Need createdNeed = needService.createNeed(needDTO);

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