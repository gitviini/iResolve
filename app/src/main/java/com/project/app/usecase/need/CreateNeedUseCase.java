package com.project.app.usecase.need;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.app.dto.need.NeedDTO;
import com.project.app.entity.Need;
import com.project.app.entity.User;
import com.project.app.repository.NeedRepository;
import com.project.app.repository.UserRepository;

import java.util.Optional;

@Service
public class CreateNeedUseCase {

    @Autowired
    private NeedRepository needRepository;

    @Autowired
    private UserRepository userRepository;

    public Need execute(NeedDTO dto) {
        // 1. Buscar o dono da necessidade pelo CPF
        Optional<User> userOptional = userRepository.findByCpf(dto.getUserCpf());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado para o CPF informado.");
        }

        User user = userOptional.get();

        // 2. Validar duplicidade (Regra 409)
        if (needRepository.existsByTitleAndUser(dto.getTitle(), user)) {
            throw new IllegalStateException("Necessidade já existe!");
        }

        // 3. Montar o objeto Need
        Need need = new Need();
        need.setTitle(dto.getTitle());
        need.setDescription(dto.getDescription());
        need.setValue(dto.getValue());
        need.setCategory(dto.getCategory());
        need.setCep(dto.getCep());
        need.setAddress(dto.getAddress());
        need.setImageBase64(dto.getImageBase64());
        need.setUser(user);

        // Converte a lista de tags ["Casa", "Limpeza"] em string "Casa,Limpeza"
        if (dto.getTags() != null) {
            need.setTags(String.join(",", dto.getTags()));
        }

        // 4. Salvar no banco
        return needRepository.save(need);
    }
}