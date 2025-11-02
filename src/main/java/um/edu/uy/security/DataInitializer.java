package um.edu.uy.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import um.edu.uy.user.Role;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;

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
            admin.setName("admin");
            admin.setPassword(passwordEncoder.encode("12345"));
            admin.setRole(Role.adminRole);
            userRepository.save(admin);
            System.out.println("Created first admin user!");
        }
    }
}