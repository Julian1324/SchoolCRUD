package com.julian.app.usuarios_service.security;


import com.auth0.jwt.exceptions.JWTVerificationException;
import com.julian.app.usuarios_service.entities.Usuario;
import com.julian.app.usuarios_service.repositories.UsuarioRepository;
import com.julian.app.usuarios_service.utils.EstadosEnum;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.log4j.Log4j2;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;


@Component
@AllArgsConstructor
@Log4j2
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    JwtService jwtService;
    HandlerExceptionResolver handlerExceptionResolver;
    UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);
                return;
            }

            jwt = authHeader.substring(7);

            userEmail = jwtService.extractUsername(jwt);

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                Usuario userDetails = this.usuarioRepository.findByCorreo(userEmail, EstadosEnum.ACTIVO.getEstado()).get();
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null
                    );

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );


                }else if(jwtService.isTokenExpiredButRenewable(jwt)){
                    String newToken = jwtService.generateToken(userDetails);
                    response.setHeader("New-Token", newToken);
                }

            }

        } catch (JWTVerificationException ex) {
            handlerExceptionResolver.resolveException(request, response, null, ex);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error de verificación JWT: " + ex.getMessage());
            return;
        } catch (Exception ex) {
            handlerExceptionResolver.resolveException(request, response, null, ex);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error de autenticación: " + ex.getMessage());
            return;
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getRequestURI().endsWith("/settings");
    }
}
