package com.julian.app.estudiantes_service.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.julian.app.estudiantes_service.dto.PersonaDTO;

@FeignClient(name = "persona-service", url = "http://localhost:8001")
public interface PersonaFeignClient {

    @PostMapping("/personasByIds")
    List<PersonaDTO> getPersonasByIds(@RequestBody List<Long> ids);
}
