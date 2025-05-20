package com.julian.app.personas_service.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PersonaDTO {

    public PersonaDTO(Long idPersona, String nombre, String apellido, LocalDate fechaNacimiento, String email,
            String telefono) {
        this.idPersona = idPersona;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
    }

    @NotNull(message = "El id de la persona es obligatorio.")
    @Pattern(regexp = "^[0-9]+$", message = "El id de la persona debe ser un número.")
    private Long idPersona;

    @NotBlank(message = "El nombre es obligatorio.")
    @Size(max = 50, message = "El nombre no puede tener más de 50 caracteres.")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio.")
    @Size(max = 50, message = "El apellido no puede tener más de 50 caracteres.")
    private String apellido;

    @NotNull(message = "La fecha de nacimiento es obligatoria.")
    @Past(message = "La fecha de nacimiento debe ser en el pasado.")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaNacimiento;

    @Pattern(regexp = "\\d+", message = "El teléfono debe contener solo números.")
    private String telefono;

    @NotBlank(message = "El email es obligatorio.")
    @Email(message = "El email no tiene un formato válido.")
    private String email;
}
