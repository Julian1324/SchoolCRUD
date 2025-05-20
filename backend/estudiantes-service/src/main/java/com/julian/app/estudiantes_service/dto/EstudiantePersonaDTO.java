package com.julian.app.estudiantes_service.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class EstudiantePersonaDTO {
    private Long idEstudiante;
    private Long idPersona;
    private String numeroMatricula;
    private String grado;
    private String nombre;
    private String apellido;
    private LocalDate fechaNacimiento;
    private String email;
    private String telefono;

    public EstudiantePersonaDTO(Long idEstudiante, Long idPersona, String numeroMatricula, String grado,
            String nombre, String apellido, LocalDate fechaNacimiento, String email, String telefono) {
        this.idEstudiante = idEstudiante;
        this.idPersona = idPersona;
        this.numeroMatricula = numeroMatricula;
        this.grado = grado;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
    }
}
