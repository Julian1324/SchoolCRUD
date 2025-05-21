package com.julian.app.profesores_service.entities;

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
@Table(name = "profesores")
public class Profesor {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profesor_seq_gen")
    @SequenceGenerator(name = "profesor_seq_gen", sequenceName = "seq_profesores", allocationSize = 1)
    @Column(name = "id_profesor")
    private Long idProfesor;

    @Column(name = "id_persona")
    private Long idPersona;

    @Column(nullable = false, unique = true, length = 100)
    private String especialidad;

    @Column(name = "fecha_contratacion", nullable = false, length = 100)
    private LocalDate fechaContratacion;
}
