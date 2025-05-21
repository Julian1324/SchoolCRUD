package com.julian.app.profesores_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.julian.app.profesores_service.clients")
public class ProfesoresServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProfesoresServiceApplication.class, args);
	}

}
