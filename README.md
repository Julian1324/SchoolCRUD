# 🛠️ Aplicación Web - Angular 14 + Spring Boot 3 (Java 21)

Este proyecto es una aplicación web que utiliza Angular 14 para el frontend y Spring Boot 3 con Java 21 para el backend. A continuación se describen los pasos para instalar y ejecutar ambos componentes del proyecto.

---

## 📦 Requisitos

### Frontend (Angular 14)

- Node.js (v16.x recomendado)
- npm o yarn
- Angular CLI v14

### Backend (Spring Boot 3)

- Java 21
- Maven 3.8+
- Base de datos PostgreSQL 15
---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Julian1324/SchoolCRUD.git
cd SchoolCRUD

🧩 Base de datos - PostgreSQL (15)

1. Configurar la base de datos en PostgreSQL

Asegúrate de tener PostgreSQL en ejecución.

- Una vez dentro de psql (psql -U tu_usuario); ejecutar el comando \i schooldb.sql

🧩 Backend - Spring Boot (Java 21)

📁 Ubicación: backend/

1. Configurar variables de entorno (application.yml)

- Cambiar username y password por el usuario y la contraseña de PostgreSQL.

2. Compilar y ejecutar

Es necesario compilar los microservicios en el siguiente orden para no generar errores:

- Ejecutar ./mvnw spring-boot:run al microservicio "eurekaserver".
- Ejecutar ./mvnw spring-boot:run al microservicio "schoolapigateway".
- Ejecutar ./mvnw spring-boot:run al microservicio "usuarios-service".
- Ejecutar ./mvnw spring-boot:run al microservicio "personas-service".
- Ejecutar ./mvnw spring-boot:run al microservicio "estudiantes-service".
- Ejecutar ./mvnw spring-boot:run al microservicio "profesores-service".

Y por último, asegúrate de que los backends estén corriendo y de que Eureka haga el descubrimiento de servicios. Esto lo puedes verificar en el navegador accediendo a http://localhost:8761.
Normalmente tarda un poco en que Eureka registre los servicios.

🎨 Frontend - Angular 14

📁 Ubicación: frontend/

1. Instalar dependencias ejecutando:
- npm install

2. Ejecutar aplicación en desarrollo:
- ng serve

¡Ya la aplicación está lista para usarse! Puedes usar el siguiente usuario para loguearte en la aplicación:

- Email: julian-ortiz98@hotmail.com
- Password: Julian123
