package um.edu.uy.security;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import um.edu.uy.user.Role;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if an admin user already exists
            if (userRepository.findByRole(Role.adminRole).isEmpty()) {
                System.out.println("No admin user found. Creating initial admin...");

                User adminUser = new User();
                adminUser.setEmail("admin@pizzum.com"); // Set your admin email
                adminUser.setPassword(passwordEncoder.encode("1234!")); // Set a strong password
                adminUser.setRole(Role.adminRole);

                User clientUser = new User();
                clientUser.setEmail("client@pizzum.com"); // Set your client email
                clientUser.setPassword(passwordEncoder.encode("1234!")); // Set a strong password
                clientUser.setRole(Role.clientRole);

                userRepository.save(adminUser);
                userRepository.save(clientUser);
                System.out.println("user created");
            }
        };
    }
}