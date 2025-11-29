package com.project.app.controllers.routes;

// --- Imports Vinicius ---
import java.util.List;
import com.project.app.models.patterns.JsonResponse;
import com.project.app.models.useCases.UserUseCases;

// --- Novos imports (para Cadastro) ---
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.project.app.dto.UserDTO;
import com.project.app.services.UserService;
import jakarta.validation.Valid;

// --- Imports em Comum ---
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.app.models.entities.Users;

@RestController
@RequestMapping("auth") // Prefixo /auth para toda a classe
public class Auth {

    // ----------------------------------------------
    // --- CÓDIGO VINICIUS (LOGIN) - INTOCADO ---
    // ----------------------------------------------

    @Autowired
    private UserUseCases userUseCases;

    // login
    @PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody Users user) {
        JsonResponse jsonResponse = new JsonResponse("Usuário autenticado.", 200);

        // verify if user don't exist
        if (!userUseCases.exists(user)) {
            jsonResponse.setMessage("Usuário não encontrado.");
            jsonResponse.setStatus(404);
        }

        // jwt confirm
        // code ...

        return ResponseEntity.status(jsonResponse.getStatus()).body(jsonResponse.getMessage());
    }

    // ----------------------------------------------
    // --- NOVO CÓDIGO (CADASTRO) - TAREFA UH1 ---
    // ----------------------------------------------

    // Injeta o Service da lógica de cadastro.
    @Autowired
    private UserService userService;

    /**
     * TAREFA: Configurar rota de criação POST - "auth/users"
     * Recebe um DTO validado (@Valid)
     */
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO) {

        try {
            // Tenta chamar o nosso serviço para criar o usuário.
            Users newUser = userService.createUser(userDTO);

            // TAREFA: "Caso sucesso: retornar dados do user, status 201, msg"
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Usuário criado com sucesso!");
            response.put("user", newUser);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (RuntimeException e) {
            // TAREFA: "Caso usuário já existe: retornar status 409, msg"
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage()); // "Usuário já cadastrado"

            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
        }
    }

    /**
     * TAREFA: "Caso campos incorretos: retornar status 400, msg"
     * Este método "apanha" os erros do @Valid no método createUser.
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, Object> handleValidationExceptions(MethodArgumentNotValidException ex) {

        Map<String, Object> errors = new HashMap<>();
        errors.put("message", "Campos incorretos");

        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            fieldErrors.put(fieldName, errorMessage);
        });

        errors.put("errors", fieldErrors);
        return errors;
    }
}