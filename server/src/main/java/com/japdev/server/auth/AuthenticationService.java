package com.japdev.server.auth;

import com.japdev.server.config.JwtService;
import com.japdev.server.token.Token;
import com.japdev.server.token.TokenRepository;
import com.japdev.server.token.TokenType;
import com.japdev.server.user.Role;
import com.japdev.server.user.User;
import com.japdev.server.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
            var user = User.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .address(request.getAddress())
                    .company(request.getCompany())
                    .position(request.getPosition())
                    .contacts(request.getContacts())
                    .role(Role.USER)
                    .build();
            var savedUser = repository.save(user);
            var jwtToken = jwtService.generateToken(user);
            savedUserToken(savedUser, jwtToken);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }

    public AuthenticationResponse authenticate (AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        revokeAllToken(user);
        savedUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void savedUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }
    private void revokeAllToken(User user) {
        var validUserTokens =tokenRepository.findAllValidTokenByUser(user.getId());
        if(validUserTokens.isEmpty()) return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
