package com.project.app.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.app.entity.Need;
import com.project.app.entity.User;

public interface NeedRepository extends JpaRepository<Need, UUID> {
    // Verifica se já existe uma necessidade com este título para este usuário
    // (Regra: "Caso necessidade já exista")
    boolean existsByTitleAndUser(String title, User user);

    @Query("SELECT n FROM Need n WHERE " +
            "(:term IS NULL OR " +
            " LOWER(n.title) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            " LOWER(n.description) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            " LOWER(n.category) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            " LOWER(n.tags) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            " LOWER(n.address) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            " LOWER(n.contractorName) LIKE LOWER(CONCAT('%', :term, '%')) ) " +

            "AND (:tag IS NULL OR LOWER(n.tags) LIKE LOWER(CONCAT('%', :tag, '%'))) " +

            "ORDER BY n.createdAt DESC, n.value DESC")
    Page<Need> searchNeeds(@Param("term") String term, @Param("tag") String tag, Pageable pageable);
}