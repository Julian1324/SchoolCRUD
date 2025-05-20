package com.julian.app.estudiantes_service.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class PersonaDTO {
    private Long idPersona;
    private String nombre;
    private String apellido;
    private LocalDate fechaNacimiento;
    private String email;
    private String telefono;
}
