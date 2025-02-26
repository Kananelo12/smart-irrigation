package com.irrigation.irrigation.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class RegisterRequest {
    @NotNull
    private String name;

    @NotNull
    @Size(min = 3, message = "Username must be at least 3 characters long")
    private String username;

    @NotNull
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    // Getter and Setters
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
