package com.project.app.controller.contract;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.app.dto.contract.HireDTO;
import com.project.app.entity.Contract;
import com.project.app.service.ContractService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/contracts")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @PutMapping("/{id}/finish")
    public ResponseEntity<?> finishContract(
            @PathVariable UUID id,
            @RequestHeader("Authorization") String token) {
        
        try {
            Contract contract = contractService.finishService(id, token);
            
            return ResponseEntity.ok(Map.of(
                "message", "Serviço finalizado! Pagamento liberado ao prestador.",
                "grossValue", contract.getAgreedValue(),
                "platformFee", contract.getPlatformFee(),
                "netValue", contract.getNetValue(), // Valor que vai pro prestador
                "status", contract.getStatus()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> hire(@RequestHeader("Authorization") String token, 
                                  @Valid @RequestBody HireDTO dto) {
        try {
            Contract contract = contractService.hireProvider(token, dto);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Pagamento em Garantia! Contratação realizada com sucesso.",
                "contractId", contract.getId(),
                "status", contract.getStatus()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}