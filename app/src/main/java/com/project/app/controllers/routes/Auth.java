package com.project.app.controllers.routes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.app.models.entities.Users;
import com.project.app.models.patterns.JsonResponse;
import com.project.app.models.useCases.UserUseCases;

@RestController
@RequestMapping("auth")
public class Auth {
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
}
