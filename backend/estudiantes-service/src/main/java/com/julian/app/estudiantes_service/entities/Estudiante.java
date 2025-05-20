package com.julian.app.estudiantes_service.entities;

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
@Table(name = "estudiantes")
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "estudiante_seq_gen")
    @SequenceGenerator(
        name = "estudiante_seq_gen",
        sequenceName = "seq_estudiantes",
        allocationSize = 1
    )
    @Column(name = "id_estudiante", nullable = false)
    private Long idEstudiante;
    
    @Column(name = "id_persona", nullable = false)
    private Long idPersona;

    @Column(name = "numero_matricula", nullable = false, unique = true, length = 100)
    private String numeroMatricula;

    @Column(nullable = false, length = 100)
    private String grado;
}
