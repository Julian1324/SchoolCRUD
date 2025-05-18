CREATE DATABASE schooldb;

\c schooldb

CREATE SEQUENCE seq_personas
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE personas (
    id_persona INTEGER PRIMARY KEY DEFAULT nextval('seq_personas'),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20)
);

CREATE SEQUENCE seq_estudiantes
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE estudiantes (
    id_estudiante INTEGER PRIMARY KEY DEFAULT nextval('seq_estudiantes'),
    id_persona INTEGER NOT NULL,
    numero_matricula VARCHAR(50) NOT NULL UNIQUE,
    grado VARCHAR(50) NOT NULL,
    CONSTRAINT fk_estudiante_persona
        FOREIGN KEY (id_persona)
        REFERENCES personas (id_persona)
        ON DELETE CASCADE
);

CREATE SEQUENCE seq_profesores
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE profesores (
    id_profesor INTEGER PRIMARY KEY DEFAULT nextval('seq_profesores'),
    id_persona INTEGER NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    fecha_contratacion DATE NOT NULL,
    CONSTRAINT fk_profesor_persona
        FOREIGN KEY (id_persona)
        REFERENCES personas (id_persona)
        ON DELETE CASCADE
);