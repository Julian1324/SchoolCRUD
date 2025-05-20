package com.julian.app.usuarios_service.repositories;

import com.julian.app.usuarios_service.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT u FROM Usuario u WHERE u.correo = :correo AND u.estado = :estado")
    Optional<Usuario> findByCorreo(@Param("correo") String correo, @Param("estado")String estado);
}
