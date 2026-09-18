package com.falak.fintrack.service;

import com.falak.fintrack.dto.AuthDTO;
import com.falak.fintrack.dto.ProfileDTO;
import com.falak.fintrack.entity.ProfileEntity;
import com.falak.fintrack.repository.ProfileRepository;
import com.falak.fintrack.util.JwtUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class ProfileService {
    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // Registers a new profile in the system
    public ProfileDTO registerProfile(ProfileDTO profileDTO) {
        if (profileRepository.findByEmail(profileDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        ProfileEntity newProfile = toEntity(profileDTO);
        newProfile.setPassword(passwordEncoder.encode(profileDTO.getPassword()));
        newProfile.setActivationToken(UUID.randomUUID().toString());
        newProfile.setIsActive(false);

        newProfile = profileRepository.save(newProfile);

        String activationLink = "http://localhost:8080/api/activate?token=" + newProfile.getActivationToken();
        String subject = "Activate your FinTrack account";
        String body = "Click the activation link to activate your account: " + activationLink;

        try {
            emailService.sendEmail(newProfile.getEmail(), subject, body);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
        return toDTO(newProfile);
    }

    // Convert incoming profile data (DTO) into a database entity object
    public ProfileEntity toEntity(ProfileDTO profileDTO) {
        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .firstName(profileDTO.getFirstName())
                .lastName(profileDTO.getLastName())
                .email(profileDTO.getEmail())
                .password(profileDTO.getPassword())
                .profileImgUrl(profileDTO.getProfileImgUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    // Convert database profile entity into DTO to send as API response
    public ProfileDTO toDTO(ProfileEntity profileEntity) {
        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .firstName(profileEntity.getFirstName())
                .lastName(profileEntity.getLastName())
                .email(profileEntity.getEmail())
                .profileImgUrl(profileEntity.getProfileImgUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public boolean activateProfile(String activationToken) {
        return profileRepository.findByActivationToken(activationToken)
                .map(profile -> {
                    profile.setIsActive(true);
                    profileRepository.save(profile);
                    return true;
                })
                .orElse(false);
    }

    public boolean isAccountActive(String email) {
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || authentication.getPrincipal().equals("anonymousUser")) {
            throw new RuntimeException("User is not authenticated");
        }

        String email = authentication.getName();

        return profileRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Profile not found for email: " + email));
    }

    public ProfileDTO getProfile(String email) {
        ProfileEntity profile = (email == null)
                ? getCurrentProfile()
                : profileRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "No profile found with this email: " + email
                        ));

        return toDTO(profile);
    }

    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO) {
        if (!isAccountActive(authDTO.getEmail())) {
            throw new RuntimeException("Account not activated");
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authDTO.getEmail(), authDTO.getPassword()
                    )
            );

            String token = jwtUtil.generateToken(authDTO.getEmail());

            return Map.of(
                    "token", token,
                    "user", getProfile(authDTO.getEmail())
            );
        }catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password");
        }
    }

}
