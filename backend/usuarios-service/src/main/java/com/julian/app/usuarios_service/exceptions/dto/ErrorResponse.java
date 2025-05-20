package com.julian.app.usuarios_service.exceptions.dto;

import lombok.Data;

@Data
public class ErrorResponse {
    private String message;

    public ErrorResponse(String mensaje) {
        this.message = mensaje;
    }

}
