package com.project.app.models.useCases;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.app.models.entities.Users;
import com.project.app.models.repositories.UsersRepository;

@Service
public class UserUseCases {
    @Autowired
    private UsersRepository usersRepository;

    public Users register(Users user) {
        usersRepository.save(user);
        return user;
    }

    public List<Users> list() {
        return usersRepository.findAll();
    }

    // SUBSTITUÍ TODO O MÉTODO 'exists' POR ESTE:
    /**
     * Verifica se um usuário existe e se as credenciais (nome e senha) batem.
     * Agora usa Optional para evitar erros de NullPointer.
     */
    public boolean exists(Users user) {
        // 1. Busca o usuário pelo CPF e recebe um Optional
        Optional<Users> optionalUser = usersRepository.findByCpf(user.getCpf());

        // 2. Se o Optional estiver vazio (usuário não encontrado), retorna false.
        if (optionalUser.isEmpty()) {
            return false;
        }

        // 3. Se chegou aqui, o usuário existe. Pega ele de dentro do Optional.
        Users userFound = optionalUser.get();

        // 4. Faz a mesma verificação de antes:
        // Checa se o nome e a senha da requisição batem com os do banco.
        if (!user.getName().equals(userFound.getName()) || !user.getPassword().equals(userFound.getPassword())) {
            return false;
        }

        return true;
    }
}