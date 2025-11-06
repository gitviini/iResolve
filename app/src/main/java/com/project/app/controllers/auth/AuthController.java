package com.project.app.controllers.auth;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.project.app.dto.user.LoginUserDTO;
import com.project.app.dto.user.RegisterUserDTO;
import com.project.app.dto.user.UserResponseDTO;
import com.project.app.exception.InvalidUserCredentialsException;
import com.project.app.usecase.user.LoginUserUseCase;
import com.project.app.usecase.user.RegisterUserUseCase;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// Prefixo /auth para toda a classe
@RequestMapping("auth") 
public class AuthController {
    /*
     * LOGIN [UH2]
     *
     */

    // injeção de dependência
    @Autowired
    private LoginUserUseCase loginUserUseCase;

    @PostMapping("login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginUserDTO loginUserDTO) {
        try {
            // tenta efetuar login
            // caso sucesso: recebe UserResponseDTO
            // caso erro: lança exceptions (mais informações dentro do useCase)
            UserResponseDTO userResponseDTO = loginUserUseCase.execute(loginUserDTO);

            // instantiate new response hashMap
            // usuário existe: retorna dados recebidos + mensagem de sucesso
            Map<String, Object> response = new HashMap<>();
            response.put("user", userResponseDTO);
            response.put("message", "Usuário autenticado com sucesso!");

            // jwt confirm
            // code ...

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        // Usuário não encontrado
        catch (InvalidUserCredentialsException e) {
            Map<String, Object> errors = new HashMap<>();

            errors.put("message", "CPF ou Senha inválidos.");

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errors);
        } catch (RuntimeException e) {
            Map<String, Object> errors = new HashMap<>();

            errors.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        }
    }

    // ----------------------------------------------
    // --- (CADASTRO) - TAREFA UH1 ---
    // ----------------------------------------------

    /**
     * TAREFA: Configurar rota de criação POST - "auth/users"
     * Recebe um DTO validado (@Valid)
     */

    // injeção de dependência
    @Autowired
    private RegisterUserUseCase registerUserUseCase;

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@Valid @RequestBody RegisterUserDTO userRegisterDTO) {

        try {
            // tenta registrar novo usuário
            // caso sucesso: recebe UserResponseDTO
            // caso erro: lança exception (mais informações dentro do useCase)
            UserResponseDTO userResponseDTO = registerUserUseCase.execute(userRegisterDTO);

            // TAREFA: "Caso sucesso: retornar dados do user, status 201, msg"
            Map<String, Object> response = new HashMap<>();
            response.put("user", userResponseDTO);
            response.put("message", "Usuário criado com sucesso!");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (RuntimeException e) {
            // TAREFA: "Caso usuário já existe: retornar status 409, msg"
            Map<String, String> error = new HashMap<>();
            error.put("message", "CPF já cadastrado"); // "Usuário já cadastrado"

            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
        }
    }

    /**
     * MANIPULADORES DE EXCEPTIONS
     *
     */

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
