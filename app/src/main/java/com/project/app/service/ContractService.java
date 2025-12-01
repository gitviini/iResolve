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

// --- IMPORTS ADICIONADOS PARA A UH7 ---
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.UUID;
// --------------------------------------

@Service
public class ContractService {

    @Autowired private ContractRepository contractRepository;
    @Autowired private NeedRepository needRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private JwtUseCase jwtUseCase;

    // --- LÓGICA DA UH6 (JÁ EXISTIA) ---
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

    // --- NOVA LÓGICA DA UH7 (ADICIONE ISSO) ---
    @Transactional
    public Contract finishService(UUID contractId, String token) {
        // 1. Identificar quem está tentando finalizar (Tem que ser o Contratante)
        String tokenReal = token.replace("Bearer ", "");
        String userCpf = jwtUseCase.extractCpf(tokenReal);
        User user = userRepository.findByCpf(userCpf)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // 2. Buscar o contrato
        Contract contract = contractRepository.findById(contractId)
            .orElseThrow(() -> new RuntimeException("Contrato não encontrado"));

        // 3. Validações
        // A: Só o dono da necessidade (contratante) pode finalizar
        if (!contract.getNeed().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Apenas o contratante pode finalizar o serviço.");
        }
        
        // B: O serviço tem que estar em andamento/pago (IN_ESCROW)
        if (contract.getStatus() != ContractStatus.IN_ESCROW) {
            throw new RuntimeException("Este contrato não pode ser finalizado (Status atual: " + contract.getStatus() + ")");
        }

        // 4. Cálculos Financeiros (Taxa de 10%)
        BigDecimal grossValue = contract.getAgreedValue();
        BigDecimal feePercentage = new BigDecimal("0.10"); // 10%
        
        // Calcula a taxa e arredonda de forma segura (HALF_EVEN é o padrão bancário)
        BigDecimal fee = grossValue.multiply(feePercentage).setScale(2, RoundingMode.HALF_EVEN);
        // Calcula o valor líquido (Bruto - Taxa)
        BigDecimal net = grossValue.subtract(fee);

        // 5. Atualizar Contrato com os valores e status
        contract.setPlatformFee(fee);
        contract.setNetValue(net);
        contract.setStatus(ContractStatus.COMPLETED); // Finalizado
        contract.setFinishedAt(LocalDateTime.now());  // Data de agora

        // 6. Atualizar Necessidade (Para 'DONE')
        Need need = contract.getNeed();
        need.setStatus(NeedStatus.DONE);
        needRepository.save(need);

        // 7. Salvar e Retornar
        return contractRepository.save(contract);
    }
}