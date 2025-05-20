package com.julian.app.usuarios_service.exceptions;

import org.springframework.http.HttpStatus;

public class RecursoNoAutorizadoException extends RuntimeException {
    private final HttpStatus status;

    public RecursoNoAutorizadoException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}

