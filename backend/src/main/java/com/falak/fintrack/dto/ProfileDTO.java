package com.falak.fintrack.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ProfileDTO {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String profileImgUrl;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
