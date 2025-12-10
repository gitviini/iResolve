package com.project.app.controller.chat;

import com.project.app.usecase.chat.ListConversationsUseCase;
import com.project.app.usecase.jwt.JwtUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ListConversationsUseCase listConversationsUseCase;

    @Autowired
    private JwtUseCase jwtUseCase;

    // GET /chat (Hub de Conversas)
    @GetMapping
    public ResponseEntity<?> getConversations(@RequestHeader("Authorization") String token) {
        try {
            // Extrair CPF do token
            String tokenReal = token.replace("Bearer ", "");
            String userCpf = jwtUseCase.extractCpf(tokenReal);

            // Executar lógica
            var conversations = listConversationsUseCase.execute(userCpf);

            return ResponseEntity.ok(conversations);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao carregar conversas: " + e.getMessage());
        }
    }
}