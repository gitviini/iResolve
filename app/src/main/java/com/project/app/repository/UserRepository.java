package com.project.app.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.app.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    // Tratamento de NullPointerException
    public Optional<User> findByCpf(String cpf);

    Optional<User> findByNickname(String nickname);

    // --- BUSCA DE USUARIOS [UH5] ---
    // Essa consulta por Nome OU Bairro, e filtra por Habilidade

    /* @Query("SELECT u FROM User u WHERE " +
            "(:term IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :term, '%')) OR LOWER(u.neighborhood) LIKE LOWER(CONCAT('%', :term, '%'))) "
            +
            "AND (:skill IS NULL OR LOWER(u.skills) LIKE LOWER(CONCAT('%', :skill, '%'))) "
            +
            "ORDER BY u.isVerified DESC, u.rating DESC")
    Page<User> searchProviders(@Param("term") String term, @Param("skill") String skill, Pageable pageable);
 */

    /* JOIN u.skills s
            WHERE
                (:term IS NULL
                 OR LOWER(u.name) LIKE LOWER(CONCAT('%', :term, '%'))
                 OR LOWER(u.neighborhood) LIKE LOWER(CONCAT('%', :term, '%')))
                AND (:skills IS NULL OR s IN (:skills)) */

    @Query("""
            SELECT u FROM User u
            
            ORDER BY u.isVerified DESC, u.rating DESC
            """)
    Page<User> searchProviders(@Param("term") String term,
            @Param("skills") List<String> skills,
            Pageable pageable);

}
