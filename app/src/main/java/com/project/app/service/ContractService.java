package com.project.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.app.dto.contract.HireDTO;
import com.project.app.entity.Contract;
import com.project.app.entity.Need;
import com.project.app.entity.User;
import com.project.app.entity.enums.ContractStatus;
import com.project.app.entity.enums.NeedStatus;
import com.project.app.repository.ContractRepository;
import com.project.app.repository.NeedRepository;
import com.project.app.repository.UserRepository;
import com.project.app.usecase.jwt.JwtUseCase;

import jakarta.transaction.Transactional;

@Service
public class ContractService {

    @Autowired private ContractRepository contractRepository;
    @Autowired private NeedRepository needRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private JwtUseCase jwtUseCase;

    @Transactional
    public Contract hireProvider(String token, HireDTO dto) {
        // 1. Identificar quem está contratando (Dono da Necessidade)
        String tokenReal = token.replace("Bearer ", "");
        String contractorCpf = jwtUseCase.extractCpf(tokenReal);
        User contractor = userRepository.findByCpf(contractorCpf)
            .orElseThrow(() -> new RuntimeException("Contratante não encontrado"));

        // 2. Buscar a Necessidade
        Need need = needRepository.findById(dto.getNeedId())
            .orElseThrow(() -> new RuntimeException("Necessidade não encontrada"));

        // 3. Validações
        // A: Só o dono pode contratar
        if (!need.getUser().getId().equals(contractor.getId())) {
            throw new RuntimeException("Você não pode contratar para uma necessidade que não é sua.");
        }
        // B: Está aberta?
        if (need.getStatus() != NeedStatus.OPEN) {
            throw new RuntimeException("Esta necessidade já foi contratada ou finalizada.");
        }

        // 4. Buscar o Prestador
        User provider = userRepository.findByNickname(dto.getProviderNickname())
            .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));

        // C: Não pode contratar a si mesmo
        if (provider.getId().equals(contractor.getId())) {
            throw new RuntimeException("Você não pode contratar a si mesmo.");
        }

        // 5. Criar Contrato (Simulando Pagamento Aprovado)
        Contract contract = new Contract();
        contract.setNeed(need);
        contract.setProvider(provider);
        contract.setAgreedValue(dto.getValue());
        contract.setPaymentMethod(dto.getPaymentMethod());
        contract.setStatus(ContractStatus.IN_ESCROW);

        // 6. Atualizar Necessidade para HIRED
        need.setStatus(NeedStatus.HIRED);
        needRepository.save(need);

        // 7. Salvar Contrato
        return contractRepository.save(contract);
    }
}