package com.julian.app.personas_service.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "personas")
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "persona_seq_gen")
    @SequenceGenerator(
        name = "persona_seq_gen",
        sequenceName = "seq_personas",
        allocationSize = 1
    )
    @Column(name = "id_persona")
    private Long idPersona;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String apellido;

    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(length = 20)
    private String telefono;
}