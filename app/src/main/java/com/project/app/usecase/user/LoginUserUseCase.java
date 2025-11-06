package com.project.app.usecase.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.app.dto.user.LoginUserDTO;
import com.project.app.dto.user.UserResponseDTO;
import com.project.app.entity.User;
import com.project.app.exception.InvalidUserCredentialsException;
import com.project.app.repository.UserRepository;

/*
 * User login logic implement [UH2]
 */

@Service
public class LoginUserUseCase {
    @Autowired
    private UserRepository userRepository;

    /*
     * Efetua login de usuário [UH2]
     * caso sucesso: retorna DTO com informações do usuário
     * caso erro: retorna exception de credenciais inválidas
     */
    public UserResponseDTO execute(LoginUserDTO loginUserDTO){
        // nova entidade a partir dos dados recebidos pelo front 
        User loginUser = this.toEntity(loginUserDTO);

        // procura usuário por cpf
        Optional<User> optionalLoginUser = userRepository.findByCpf(loginUser.getCpf());
        
        // caso usário não exista, lança exception de credenciais inválidas
        if(optionalLoginUser.isEmpty()){
            throw new InvalidUserCredentialsException();
        }

        // usuário existe, atribuir a variável correspondente
        User loginUserFound = optionalLoginUser.get();

        // caso a senha recebida não seja correta, lança exception de credenciais inválidas
        if(!loginUserFound.getPassword().equals(loginUser.getPassword())){
            throw new InvalidUserCredentialsException();
        }

        // caso sucesso: manipula dados tornando-os adequada para resposta (User -> UserResponseDTO)
        return UserResponseDTO.toDTO(loginUserFound);
    }

    /*
     * Converte User para LoginUserDTO
     */
    private User toEntity(LoginUserDTO loginUserDTO){
        User user = new User();
        user.setCpf(loginUserDTO.getCpf());
        user.setPassword(loginUserDTO.getPassword());

        return user;
    }
}
