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
            User admin = User.builder()
                    .name("Admin")
                    .surname("pizzumburgum")
                    .email("admin@pizzum.com")
                    .password(passwordEncoder.encode("1234"))
                    .role(Role.adminRole)
                    .build();
            userRepository.save(admin);
            System.out.println("user created");
        }
    }
}