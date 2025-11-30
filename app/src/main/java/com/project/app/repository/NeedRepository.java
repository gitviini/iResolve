package com.project.app.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.app.entity.Need;
import com.project.app.entity.User;

public interface NeedRepository extends JpaRepository<Need, UUID> {
    // Verifica se já existe uma necessidade com este título para este usuário
    // (Regra: "Caso necessidade já exista")
    boolean existsByTitleAndUser(String title, User user);
}