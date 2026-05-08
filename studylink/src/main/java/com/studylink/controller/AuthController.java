package com.studylink.controller;

import com.studylink.model.User;
import com.studylink.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return authService.registerUser(user);
    }

    @GetMapping("/user/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return authService.findByEmail(email);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User loginRequest) {
        return authService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
    }
}
