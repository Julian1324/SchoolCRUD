package com.julian.app.usuarios_service.utils;

public enum EstadosEnum {
    ACTIVO("A");
    private final String estado;

    EstadosEnum(String estado) {
        this.estado = estado;
    }

    public String getEstado() {
        return estado;
    }
}
