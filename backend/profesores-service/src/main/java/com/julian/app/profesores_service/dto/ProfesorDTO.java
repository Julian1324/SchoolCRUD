package com.julian.app.profesores_service.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;

@Data
public class ProfesorDTO {

    private Long idProfesor;
    
    private Long idPersona;

    @NotBlank(message = "La especialidad es obligatoria.")
    private String especialidad;

    @NotNull(message = "La fecha de contratacion es obligatoria.")
    @Past(message = "La fecha de contratacion debe ser en el pasado.")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaContratacion;
}
