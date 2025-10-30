package com.project.app.models.useCases;

import java.util.List;

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

    public boolean exists(Users user) {
        Users userFound = usersRepository.findByCpf(user.getCpf());

        if (userFound == null) {
            return false;
        }

        if (!user.getName().equals(userFound.getName()) || !user.getPassword().equals(userFound.getPassword())) {
            return false;
        }

        return true;
    }
}
