package com.irrigation.irrigation;

import com.irrigation.irrigation.model.User;
import com.irrigation.irrigation.repository.UserRepository;
import com.irrigation.irrigation.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.irrigation.irrigation.model.Role;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public DataInitializer(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // Populate the role table with default roles if none exist
        if (roleRepository.count() == 0) {
            String[] roles = { "admin", "farmer" };
            for (String roleName : roles) {
                Role role = new Role();
                role.setName(roleName);
                roleRepository.save(role);
            }
        }

        // String rawPassword = "admin@123";
        // String hashedPassword = passwordEncoder.encode(rawPassword);
        // boolean matches = passwordEncoder.matches(rawPassword, hashedPassword);
        // System.out.println("Password matches: " + matches);

        // Populate database with a default user if none exist
        if (userRepository.count() == 0) {
            User user = new User();
            Role role = roleRepository.findByName("admin").orElse(null);

            if (role == null) {
                // If the role does not exist, create it
                role = new Role();
                role.setName("admin");
                role = roleRepository.save(role);
            }
            user.setName("admin");
            user.setEmail("admin@gmail.com");
            user.setPhoneNumber("+26656768954");
            user.setRole(role);
            // Hash the password before saving
            user.setPassword("admin@123");
            userRepository.save(user);
        }
    }
}