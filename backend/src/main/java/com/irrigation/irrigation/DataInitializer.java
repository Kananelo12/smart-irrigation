package com.irrigation.irrigation;

import com.irrigation.irrigation.model.User;
import com.irrigation.irrigation.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Populate database with a default user if none exist
        if (userRepository.count() == 0) {
            User user = new User();
            user.setName("Test User");
            user.setUsername("testuse");
            user.setPassword("testpass"); // Remember: In production, never store plain text passwords!
            userRepository.save(user);
        }
    }
}