package com.julian.app.usuarios_service.controllers;

import com.julian.app.usuarios_service.dto.LoginDTO;
import com.julian.app.usuarios_service.dto.TokenDTO;
import com.julian.app.usuarios_service.services.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/autenticacion")
    public ResponseEntity<TokenDTO> autenticacionUsuario(@RequestBody LoginDTO login){
        return ResponseEntity.ok().body(usuarioService.autenticacionUsuario(login));
    }

    @GetMapping("/validartoken")
    public ResponseEntity<Boolean> validarToken(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok().body(usuarioService.validarToken(token));
    }
}
