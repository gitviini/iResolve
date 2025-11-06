package com.project.app.usecase.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.app.dto.user.RegisterUserDTO;
import com.project.app.dto.user.UserResponseDTO;
import com.project.app.entity.User;
import com.project.app.repository.UserRepository;

/*
 * User register logic implement [UH1]
 */

@Service
public class RegisterUserUseCase {
    @Autowired
    private UserRepository userRepository;
    public UserResponseDTO execute(RegisterUserDTO registerUserDTO){
        // nova entidade a partir dos dados recebidos pelo front 
        User registerUser = toEntity(registerUserDTO);

        // tenta salvar usuário no banco de dados e recebe resposta (null or User)
        User registerUserCreated = userRepository.save(registerUser);

        // caso usário não seja salvo, lança exception de runtime
        if(registerUserCreated == null){
            throw new RuntimeException();
        }
        
        // caso sucesso: manipula dados tornando-os adequada para resposta (User -> UserResponseDTO)
        return UserResponseDTO.toDTO(registerUserCreated);
    }

    private User toEntity(RegisterUserDTO registerUserDTO){
        User user = new User();
        user.setName(registerUserDTO.getName());
        user.setCpf(registerUserDTO.getCpf());
        user.setPassword(registerUserDTO.getPassword());

        return user;
    }
}