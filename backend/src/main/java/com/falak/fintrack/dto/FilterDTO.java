package com.falak.fintrack.dto;

import lombok.Data;

import java.time.LocalDate;

@Data

public class FilterDTO {
    private String type;
    private LocalDate startDate;
    private LocalDate endDate;
    private String keyword;
    // Date, amount, name
    private String sortField;
    // Ascending or Descending
    private String sortOrder;
}
