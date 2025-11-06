package com.project.app.usecase.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.app.dto.user.LoginUserDTO;
import com.project.app.dto.user.UserResponseDTO;
import com.project.app.entity.User;
import com.project.app.exception.custom.InvalidUserCredentialsException;
import com.project.app.repository.UserRepository;

/*
 * User login logic implement [UH2]
 */

@Service
public class LoginUserUseCase {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /*
     * Efetua login de usuário [UH2]
     * caso sucesso: retorna DTO com informações do usuário
     * caso erro: retorna exception de credenciais inválidas
     */
    public UserResponseDTO execute(LoginUserDTO loginUserDTO){
        // procura usuário por cpf
        Optional<User> optionalLoginUser = userRepository.findByCpf(loginUserDTO.getCpf());
        
        // caso usário não exista, lança exception de credenciais inválidas
        if(optionalLoginUser.isEmpty()){
            throw new InvalidUserCredentialsException();
        }

        // usuário existe, atribuir a variável correspondente
        User loginUserFound = optionalLoginUser.get();
        
        // pega ambas as senhas
        String rawPassword = loginUserDTO.getPassword();
        String encondendPassword = loginUserFound.getPassword();

        // compara senha "crua" com senha do banco de dados
        boolean passwordMatches = passwordEncoder.matches(rawPassword, encondendPassword);

        // caso a senha recebida não seja correta, lança exception de credenciais inválidas
        if(!passwordMatches){
            throw new InvalidUserCredentialsException();
        }

        // caso sucesso: manipula dados tornando-os adequada para resposta (User -> UserResponseDTO)
        return UserResponseDTO.toDTO(loginUserFound);
    }
}
