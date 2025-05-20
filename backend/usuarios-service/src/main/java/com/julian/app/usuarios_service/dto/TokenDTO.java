package com.julian.app.usuarios_service.dto;

import lombok.Data;

@Data
public class TokenDTO {
    private String token;

    public TokenDTO(String token) {
        this.token = token;
    }
}
