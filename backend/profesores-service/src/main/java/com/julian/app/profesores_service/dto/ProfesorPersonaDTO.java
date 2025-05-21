package com.julian.app.profesores_service.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ProfesorPersonaDTO {
    private Long idProfesor;
    private Long idPersona;
    private String nombre;
    private String apellido;
    private LocalDate fechaNacimiento;
    private String email;
    private String telefono;
    private String especialidad;
    private LocalDate fechaContratacion;

    public ProfesorPersonaDTO(Long idProfesor, Long idPersona, String nombre, String apellido,
            LocalDate fechaNacimiento, String email, String telefono,
            String especialidad, LocalDate fechaContratacion) {
        this.idProfesor = idProfesor;
        this.idPersona = idPersona;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
        this.especialidad = especialidad;
        this.fechaContratacion = fechaContratacion;
    }
}
