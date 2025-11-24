package com.project.app.models.repositories;

import java.util.UUID;
import java.util.Optional; // Importante para o findByCpf

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.app.models.entities.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, UUID> {

    // Mantém o método antigo para o Login/Cadastro funcionar
    Optional<Users> findByCpf(String cpf);

    // --- NOVO MÉTODO DA UH5 (BUSCA) ---
    // Essa consulta por Nome OU Bairro, e filtra por Habilidade
    @Query("SELECT u FROM Users u WHERE " +
           "(:term IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :term, '%')) OR LOWER(u.neighborhood) LIKE LOWER(CONCAT('%', :term, '%'))) " +
           "AND (:skill IS NULL OR LOWER(u.skills) LIKE LOWER(CONCAT('%', :skill, '%'))) " +
           "ORDER BY u.isVerified DESC, u.rating DESC")
    Page<Users> searchProviders(@Param("term") String term, @Param("skill") String skill, Pageable pageable);
}