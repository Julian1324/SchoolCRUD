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

INSERT INTO personas (nombre, apellido, fecha_nacimiento, email, telefono)
VALUES
  ('Juan', 'Pérez', '1990-03-15', 'juan.perez1@example.com', '1234567890'),
  ('María', 'García', '1985-07-20', 'maria.garcia2@example.com', '0987654321'),
  ('Luis', 'Rodríguez', '1992-11-05', 'luis.rodriguez3@example.com', '3216549870'),
  ('Ana', 'López', '1988-01-10', 'ana.lopez4@example.com', '4567891230'),
  ('Carlos', 'Martínez', '1995-05-22', 'carlos.martinez5@example.com', '7891234560'),
  ('Lucía', 'Sánchez', '1993-09-12', 'lucia.sanchez6@example.com', '6547893210'),
  ('Pedro', 'Ramírez', '1980-12-30', 'pedro.ramirez7@example.com', '1472583690'),
  ('Sofía', 'Torres', '1998-04-18', 'sofia.torres8@example.com', '9638527410'),
  ('Diego', 'Flores', '1991-06-07', 'diego.flores9@example.com', '8529637410'),
  ('Laura', 'Morales', '1987-08-25', 'laura.morales10@example.com', '7419638520');


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

CREATE SEQUENCE seq_usuarios
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE usuarios (
    id_usuario bigint PRIMARY KEY DEFAULT nextval('public.seq_usuarios'),
    contrasena character varying(255),
    correo character varying(255),
    estado character varying(255)
);

INSERT INTO usuarios (contrasena, correo, estado)
VALUES ('$2a$12$uS4GszZMFWSQ5aS1f99HSOc5OURuqI9CDNFBhq1U.WRQqtmfxH6mO', 'julian-ortiz98@hotmail.com', 'A');