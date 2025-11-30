package com.project.app.usecase.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.app.dto.user.RegisterUserDTO;
import com.project.app.dto.user.UserResponseDTO;
import com.project.app.entity.User;
import com.project.app.exception.custom.UserAlreadyRegisteredException;
import com.project.app.repository.UserRepository;

/*
 * User register logic implement [UH1]
 */

@Service
public class RegisterUserUseCase {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserResponseDTO execute(RegisterUserDTO registerUserDTO){
        // caso usuário já exista, lança exception de usuário já registrado
        if(userRepository.findByCpf(registerUserDTO.getCpf()).isPresent()){
            throw new UserAlreadyRegisteredException();
        }

        // nova entidade a partir dos dados recebidos pelo front 
        User registerUser = registerUserDTO.toEntity(registerUserDTO);
        
        // codifica senha e armazena
        String passwordEncoded =  passwordEncoder.encode(registerUser.getPassword());

        // coloca senha codificada no usuário
        registerUser.setPassword(passwordEncoded);

        // tenta salvar usuário no banco de dados e recebe resposta (null or User)
        User registerUserCreated = userRepository.save(registerUser);
        
        // caso sucesso: manipula dados tornando-os adequada para resposta (User -> UserResponseDTO)
        return UserResponseDTO.toDTO(registerUserCreated);
    }
}