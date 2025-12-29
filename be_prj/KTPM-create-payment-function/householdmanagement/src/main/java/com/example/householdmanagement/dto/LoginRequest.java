package com.example.householdmanagement.dto;

/**
 * Login Request DTO
 */
public class LoginRequest {
    private String email;
    private String password;
    private Boolean keepSignedIn;

    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getKeepSignedIn() {
        return keepSignedIn;
    }

    public void setKeepSignedIn(Boolean keepSignedIn) {
        this.keepSignedIn = keepSignedIn;
    }
}
