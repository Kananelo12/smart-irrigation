package com.irrigation.irrigation.controller;

import com.irrigation.irrigation.dto.LoginRequest;
import com.irrigation.irrigation.dto.RegisterRequest;
import com.irrigation.irrigation.model.Role;
import com.irrigation.irrigation.model.User;
import com.irrigation.irrigation.repository.RoleRepository;
import com.irrigation.irrigation.repository.UserRepository;

import jakarta.validation.Valid;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Validated
public class AuthController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public AuthController(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        return userRepository.findByEmail(loginRequest.getEmail())
                .filter(user -> user.getPassword().equals(loginRequest.getPassword()))
                .map(user -> {
                    // Store the user object in the session
                    session.setAttribute("user", user);
                    return ResponseEntity.ok("Login successful!");
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        // check if user already exists
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return new ResponseEntity<>("Email already taken! Try again.", HttpStatus.BAD_REQUEST);
        }

        Role role = roleRepository.findByName("farmer").orElse(null);

        if (role == null) {
            // If the role does not exist, create it
            role = new Role();
            role.setName("farmer");
            role = roleRepository.save(role);
        }

        // create new user entity
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setRole(role);
        user.setPassword(registerRequest.getPassword());

        System.out.println("User before saving: " + user.getPhoneNumber());

        // save the user
        userRepository.save(user);

        // return success response
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }
}
