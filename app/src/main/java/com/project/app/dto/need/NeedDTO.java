package com.project.app.dto.need;

import java.math.BigDecimal;

import com.project.app.entity.Need;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class NeedDTO {

    @NotBlank(message = "O nick do usuário é obrigatório")
    private String contractorNick;

    @NotBlank(message = "O CPF do usuário é obrigatório")
    private String userCpf;

    @NotBlank(message = "O título é obrigatório")
    private String title;

    @NotBlank(message = "A descrição é obrigatória")
    private String description;

    @NotNull(message = "O valor sugerido é obrigatório")
    private BigDecimal value;

    private String category;

    private String tags;

    private String cep;
    private String address;

    private String imageBase64;

    public static NeedDTO toDTO(Need need) {
        NeedDTO needDTO = new NeedDTO();
        needDTO.setContractorNick(need.getContractorNick());
        needDTO.setUserCpf(need.getUser().getCpf());
        needDTO.setTitle(need.getTitle());
        needDTO.setDescription(need.getDescription());
        needDTO.setValue(need.getValue());
        needDTO.setCategory(need.getCategory());
        needDTO.setTags(need.getTags());
        needDTO.setCep(need.getCep());
        needDTO.setAddress(need.getAddress());
        needDTO.setImageBase64(need.getImageBase64());

        return needDTO;
    }
}