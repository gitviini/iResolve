package com.project.app.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.project.app.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    // Tratamento de NullPointerException
    public Optional<User> findByCpf(String cpf);
}
