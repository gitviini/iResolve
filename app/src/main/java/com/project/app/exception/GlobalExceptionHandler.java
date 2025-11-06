package com.project.app.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.project.app.exception.custom.InvalidUserCredentialsException;
import com.project.app.exception.custom.UserAlreadyRegisteredException;

/*
 * MANIPULADOR DE EXCEPTIONS (GLOBAL)
 */

@RestControllerAdvice
public class GlobalExceptionHandler {

    /*
     * Credenciais Inválidas [UH2]
     * HttpStatus: 401
     */
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(InvalidUserCredentialsException.class)
    public Map<String, Object> handleInvalidUserCredentialsException(
            InvalidUserCredentialsException e) {
        Map<String, Object> errors = new HashMap<>();
        errors.put("message", "CPF ou Senha inválidos!");

        return errors;
    }

    /*
     * Usuário já cadastrado [UH2]
     * HttpStatus: 409
     */
    @ResponseStatus(value = HttpStatus.CONFLICT)
    @ExceptionHandler(UserAlreadyRegisteredException.class)
    public Map<String, Object> handleUserAlreadyRegisteredException() {
        Map<String, Object> errors = new HashMap<>();
        errors.put("message", "Usuário já cadastrado!");

        return errors;
    }

    /*
     * TAREFA: "Caso campos incorretos: retornar status 400, msg"
     * Este método "apanha" os erros do @Valid no método createUser.
     */
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
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

    /*
     * Excessões internas
     * HttpStatus: 500
     */
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(RuntimeException.class)
    public Map<String, Object> handleRuntimeException() {
        Map<String, Object> errors = new HashMap<>();
        errors.put("message", "Não foi possível concluir a ação. Tente novamente.");

        return errors;
    }
}
