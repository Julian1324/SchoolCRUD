package com.julian.app.personas_service.dto;

import java.util.List;
import lombok.Data;

@Data
public class PaginatedResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
}
