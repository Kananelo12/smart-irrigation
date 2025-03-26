package com.irrigation.irrigation.controller;

import com.irrigation.irrigation.dto.LoginRequest;
import com.irrigation.irrigation.dto.RegisterRequest;
import com.irrigation.irrigation.model.User;
import com.irrigation.irrigation.repository.UserRepository;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@Validated
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return userRepository.findByUsername(loginRequest.getUsername())
            .filter(user -> user.getPassword().equals(loginRequest.getPassword()))
            .map(user -> ResponseEntity.ok("Login successful!"))
            .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        // check if user already exists
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            return new ResponseEntity<>("Username already taken! Try again.", HttpStatus.BAD_REQUEST);
        }

        // create new user entity
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());

        // save the user
        userRepository.save(user);

        // return success response
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }
}
