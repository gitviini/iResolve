package com.project.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.app.dto.UserDTO;
import com.project.app.models.entities.Users;
import com.project.app.models.repositories.UsersRepository;
import java.util.Optional;

// @Service: Marca esta classe como um "Serviço".
// O Spring vai gerenciá-la e nos permite "injetá-la" em outros lugares, como no Controller.
@Service
public class UserService {

    // @Autowired: Injeção de Dependência.
    // Pedimos ao Spring para nos "entregar" uma instância pronta do UsersRepository
    // que ele já conhece (por causa da anotação @Repository).
    @Autowired
    private UsersRepository usersRepository;

    /**
     * Método principal da nossa lógica de negócio para criar um usuário.
     * Ele recebe o DTO (dados crus) e retorna a Entidade (dados salvos).
     */
    public Users createUser(UserDTO userDTO) {

        // 1. REGRA: "Caso usuário já existe" (Status 409)
        // Usamos o método seguro "Optional" que ajustamos no Repository.
        Optional<Users> existingUser = usersRepository.findByCpf(userDTO.getCpf());

        // Se a "caixa" (Optional) tiver algo dentro (.isPresent()),
        // significa que o usuário já existe.
        if (existingUser.isPresent()) {
            // Lançamos uma exceção. O Controller (que faremos a seguir)
            // será responsável por pegar essa exceção e
            // transformá-la em uma resposta HTTP 409 (Conflict) com a mensagem.
            throw new RuntimeException("Usuário já cadastrado");
        }

        // 2. REGRA: "Caso sucesso" (Status 201)
        // Se o usuário não existe, criamos uma nova entidade 'Users'.
        Users newUser = new Users();
        newUser.setName(userDTO.getName());
        newUser.setCpf(userDTO.getCpf());
        newUser.setPassword(userDTO.getPassword());

        // 3. Salva o novo usuário no banco de dados e o retorna.
        return usersRepository.save(newUser);
    }
}