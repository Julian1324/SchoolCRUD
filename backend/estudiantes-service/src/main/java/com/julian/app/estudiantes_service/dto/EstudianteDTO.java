package com.julian.app.estudiantes_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class EstudianteDTO {

    @NotNull(message = "El id de la persona es obligatorio.")
    private Long idPersona;
    
    private Long idEstudiante;

    @NotBlank(message = "El número de matrícula es obligatorio.")
    @Size(max = 50, message = "El número de matrícula no puede tener más de 50 caracteres.")
    private String numeroMatricula;

    @NotBlank(message = "El grado es obligatorio.")
    @Size(max = 50, message = "El grado no puede tener más de 50 caracteres.")
    private String grado;
}
