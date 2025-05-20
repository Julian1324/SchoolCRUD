package com.julian.app.usuarios_service.security;

import com.julian.app.usuarios_service.entities.Usuario;
import com.julian.app.usuarios_service.repositories.UsuarioRepository;
import com.julian.app.usuarios_service.utils.EstadosEnum;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Slf4j
@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomUserDetailsServiceImpl implements CustomUserDetailsService {

    UsuarioRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("loadUserByUsername: {}", username);
        Usuario user = userRepository.findByCorreo(username, EstadosEnum.ACTIVO.getEstado()).get();
        try {
            return new User(
                    user.getCorreo(),
                    user.getContrasena(),
                    Collections.emptyList()
            );
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
