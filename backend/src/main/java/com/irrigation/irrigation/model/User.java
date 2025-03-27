package com.irrigation.irrigation.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // full names of the user

    @Column(unique = true, nullable = false)
    private String email; // Email should be lowercase

    @Column(nullable = false, unique = true)
    @Pattern(regexp="^\\+266 ?\\d{8}$", message="Invalid phone number format. Please use '+266 56565406' or '+26656565406'.")
    private String phoneNumber; // phone number of the user

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false)
    private Role role; // Establishing relationship with Role entity

    @Column(nullable = false)
    private String password; // In production, store hashed passwords

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email; // Email is treated as the username
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}

