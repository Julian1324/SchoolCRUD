package com.julian.app.usuarios_service.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_seq_gen")
    @SequenceGenerator(
            name = "usuario_seq_gen",
            sequenceName = "seq_usuarios",
            allocationSize = 1
    )
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "correo")
    private String correo;

    @Column(name = "contrasena")
    private String contrasena;

    @Column(name = "estado")
    private String estado;
}
