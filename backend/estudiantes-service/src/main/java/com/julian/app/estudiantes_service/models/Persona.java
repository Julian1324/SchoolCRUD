package com.julian.app.estudiantes_service.models;

import lombok.Data;

@Data
public class Persona {

    private Long idPersona;
    private String nombre;
    private String apellido;
    private String fechaNacimiento;
    private String email;
    private String telefono;

    public Persona() {
    }

    public Persona(Long idPersona, String nombre, String apellido, String fechaNacimiento, String email,
            String telefono) {
        this.idPersona = idPersona;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.telefono = telefono;
    }

}
