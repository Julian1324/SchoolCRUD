package com.julian.app.estudiantes_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class EstudianteDTO {

    @NotNull(message = "El id de la persona es obligatorio")
    @Pattern(regexp = "^[0-9]+$", message = "El id de la persona debe ser un número")
    private Long idPersona;
    
    @NotNull(message = "El id del estudiante es obligatorio")
    @Pattern(regexp = "^[0-9]+$", message = "El id del estudiante debe ser un número")
    private Long idEstudiante;

    @NotBlank(message = "El número de matrícula es obligatorio")
    @Size(max = 50, message = "El número de matrícula no puede tener más de 50 caracteres")
    @JsonProperty("numero_matricula")
    private String numeroMatricula;

    @NotBlank(message = "El grado es obligatorio")
    @Size(max = 50, message = "El grado no puede tener más de 50 caracteres")
    private String grado;
}
