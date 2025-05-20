package com.julian.app.usuarios_service.services;

import com.julian.app.usuarios_service.dto.LoginDTO;
import com.julian.app.usuarios_service.dto.TokenDTO;
import com.julian.app.usuarios_service.entities.Usuario;
import com.julian.app.usuarios_service.exceptions.RecursoNoAutorizadoException;
import com.julian.app.usuarios_service.repositories.UsuarioRepository;
import com.julian.app.usuarios_service.security.JwtService;
import com.julian.app.usuarios_service.utils.EstadosEnum;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Optional;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UsuarioServiceImpl implements UsuarioService {
    PasswordEncoder passwordEncoder;
    UsuarioRepository userRepository;
    AuthenticationManager authenticationManager;
    JwtService jwtService;

    @Override
    @ExceptionHandler(RecursoNoAutorizadoException.class)
    public TokenDTO autenticacionUsuario(LoginDTO login) {
        Optional<Usuario> user = userRepository.findByCorreo(login.getCorreo(), EstadosEnum.ACTIVO.getEstado());

        if (user.isEmpty()) {
            throw new RecursoNoAutorizadoException("Verifica Las credenciales", HttpStatus.UNAUTHORIZED);
        }

        if (passwordEncoder.matches(login.getContrasena(), user.get().getContrasena())) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            login.getCorreo(),
                            login.getContrasena()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtToken = jwtService.generateToken(user.get());
            return new TokenDTO(jwtToken);
        }
        throw new RecursoNoAutorizadoException("Verifica Las credenciales", HttpStatus.UNAUTHORIZED);

    }

    @Override
    @ExceptionHandler(RecursoNoAutorizadoException.class)
    public Boolean validarToken(String token) {
        try {
            if (token == null && !token.startsWith("Bearer ")) {
                throw new RecursoNoAutorizadoException("Token invalido", HttpStatus.UNAUTHORIZED);
            }

            String jwt = token.substring(7);
            String email = jwtService.extractUsername(jwt);
            if (email != null) {
                Usuario userDetails = this.userRepository.findByCorreo(email, EstadosEnum.ACTIVO.getEstado()).get();
                return jwtService.isTokenValid(jwt, userDetails);
            }
        } catch (Exception ex) {
            throw new RecursoNoAutorizadoException("Error de verificación JWT", HttpStatus.UNAUTHORIZED);
        }
        return false;
    }
}
