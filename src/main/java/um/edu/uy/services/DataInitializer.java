package um.edu.uy.services;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import um.edu.uy.entities.Role;
import um.edu.uy.entities.User;
import um.edu.uy.repositories.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if the admin already exists
        if (userRepository.findByEmail("admin@pizzum.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@pizzum.com");
            // IMPORTANT: Encode the password!
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.adminRole);

            userRepository.save(admin);
            System.out.println("Admin user created!");
        }
    }
}
