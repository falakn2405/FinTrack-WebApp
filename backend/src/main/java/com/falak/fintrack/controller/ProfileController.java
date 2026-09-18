package com.falak.fintrack.controller;

import com.falak.fintrack.dto.AuthDTO;
import com.falak.fintrack.dto.ProfileDTO;
import com.falak.fintrack.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor

public class ProfileController {
    private final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<ProfileDTO> registerProfile(@RequestBody ProfileDTO profileDTO) {
        ProfileDTO registeredProfile = profileService.registerProfile(profileDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activateProfile(@RequestParam String token) {
        boolean isActivated = profileService.activateProfile(token);
        if(isActivated) {
            return ResponseEntity.ok("Profile activated successfully");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Activation token not found or already in use.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthDTO authDTO) {
        try {
            if (!profileService.isAccountActive(authDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Account is not active! Please check your email for activation."));
            }
            Map<String, Object> response = profileService.authenticateAndGenerateToken(authDTO);

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "An unexpected error occurred"));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> getProfile() {
        ProfileDTO profileDTO = profileService.getProfile(null);
        return ResponseEntity.ok(profileDTO);
    }
}
