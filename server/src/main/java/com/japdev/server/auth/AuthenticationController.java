package com.japdev.server.auth;

import com.japdev.server.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserRepository repository;
    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody RegisterRequest request) {
        if(repository.findByEmail(request.getEmail()).isPresent()) {
           return ResponseEntity.badRequest().body("Email is already taken");
        }
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
