package um.edu.uy.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import um.edu.uy.entities.Role;
import um.edu.uy.entities.User;
import um.edu.uy.repositories.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByRole(Role.adminRole).isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("12345"));
            admin.setRole(Role.adminRole);
            userRepository.save(admin);
            System.out.println("Created first admin user!");
        }
    }
}