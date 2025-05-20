package com.julian.app.usuarios_service.services;

import com.julian.app.usuarios_service.dto.LoginDTO;
import com.julian.app.usuarios_service.dto.TokenDTO;

public interface UsuarioService {
    TokenDTO autenticacionUsuario(LoginDTO login);

    Boolean validarToken(String token);
}
