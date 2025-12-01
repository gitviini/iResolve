package com.project.app.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.project.app.entity.Contract;

public interface ContractRepository extends JpaRepository<Contract, UUID> {
}