package com.irrigation.irrigation.controller;

import com.irrigation.irrigation.dto.LoginRequest;
import com.irrigation.irrigation.dto.RegisterRequest;
import com.irrigation.irrigation.model.Crop;
import com.irrigation.irrigation.model.Role;
import com.irrigation.irrigation.model.User;
import com.irrigation.irrigation.repository.RoleRepository;
import com.irrigation.irrigation.repository.UserRepository;
import com.irrigation.irrigation.repository.CropRepository;

import jakarta.validation.Valid;
import jakarta.servlet.http.HttpSession;
import java.util.Optional;

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
    private final CropRepository cropRepository;

    public AuthController(UserRepository userRepository, RoleRepository roleRepository, CropRepository cropRepository) {
        this.cropRepository = cropRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        return userRepository.findByEmail(loginRequest.getEmail())
                .filter(user -> user.getPassword().equals(loginRequest.getPassword()))
                .map(user -> {
                    // Store the user object in the session
                    session.setAttribute("loggedInUser", user);
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

    @PostMapping("/assignCropToUser")
    public ResponseEntity<String> assignCropToUser(@RequestParam Long cropId, HttpSession session) {
        // Retrieve the logged-in user from the session
        User user = (User) session.getAttribute("loggedInUser");
        System.out.println("Logged-in user: " + user); // Log user details

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in.");
        }

        // Retrieve the crop from the database
        Optional<Crop> cropOptional = cropRepository.findById(cropId);

        if (cropOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Crop not found.");
        }

        Crop crop = cropOptional.get();

        // Assign the selected crop to the user
        user.setSelectedCrop(crop);

        // Save the user with the updated crop selection
        userRepository.save(user);

        return ResponseEntity.ok("Crop assigned to user successfully.");
    }
}
