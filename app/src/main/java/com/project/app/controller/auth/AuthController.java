package com.project.app.controller.auth;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;

import com.project.app.dto.user.LoginUserDTO;
import com.project.app.dto.user.RegisterUserDTO;
import com.project.app.dto.user.UserResponseDTO;
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
        // tenta registrar novo usuário
        // caso sucesso: recebe UserResponseDTO
        // caso erro: lança exception (mais informações dentro do useCase)
        UserResponseDTO userResponseDTO = registerUserUseCase.execute(userRegisterDTO);

        // TAREFA: "Caso sucesso: retornar dados do user, status 201, msg"
        Map<String, Object> response = new HashMap<>();
        response.put("user", userResponseDTO);
        response.put("message", "Usuário criado com sucesso!");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
