package com.project.app.models.repositories;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.app.models.entities.Need;
import com.project.app.models.entities.Users;

public interface NeedRepository extends JpaRepository<Need, UUID> {
    // Verifica se já existe uma necessidade com este título para este usuário
    // (Regra: "Caso necessidade já exista")
    boolean existsByTitleAndUser(String title, Users user);
}