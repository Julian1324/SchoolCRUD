package com.julian.app.estudiantes_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.julian.app.estudiantes_service.clients")
public class EstudiantesServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EstudiantesServiceApplication.class, args);
	}

}
