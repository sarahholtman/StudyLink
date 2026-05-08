package com.studylink.service;

import com.studylink.model.User;
import com.studylink.repository.UserRepository;
import org.springframework.stereotype.Service;

/*
 * Handles authentication-related functionality including:
 * - user registration
 * - user login
 * - validate credentials
 * - Manage user profile (TBA)
 */

// TODO: Replace localStorage auth with secure backend authentication

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        user.setRole("STUDENT");
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User loginUser(String email, String password) {
    User user = userRepository.findByEmail(email).orElse(null);

        if (user != null && user.getPassword().equals(password)) {
            return user;
        }

        return null;
    }
}
