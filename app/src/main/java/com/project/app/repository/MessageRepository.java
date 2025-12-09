package com.project.app.repository;

import com.project.app.entity.Message;
import com.project.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface MessageRepository extends JpaRepository<Message, UUID> {

    // Busca todas as mensagens que envolvem o usuário (enviadas ou recebidas)
    // Ordenadas da mais recente para a mais antiga (para facilitar pegar a última)
    @Query("SELECT m FROM Message m WHERE m.sender = :user OR m.receiver = :user ORDER BY m.sentAt DESC")
    List<Message> findConversationsByUser(@Param("user") User user);
    
    // Contar não lidas de um usuário específico
    @Query("SELECT COUNT(m) FROM Message m WHERE m.receiver = :me AND m.sender = :target AND m.isRead = false")
    int countUnreadMessages(@Param("me") User me, @Param("target") User target);
}