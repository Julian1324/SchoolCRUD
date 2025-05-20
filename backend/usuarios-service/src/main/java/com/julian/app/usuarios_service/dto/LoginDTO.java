package com.julian.app.usuarios_service.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String correo;
    private String contrasena;
}
