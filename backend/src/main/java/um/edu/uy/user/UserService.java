// src/main/java/um/edu/uy/user/UserService.java
package um.edu.uy.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import um.edu.uy.security.AuthController; // Assuming this DTO is here
import um.edu.uy.security.dto.RegisterRequest;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registers a new CLIENT user.
     * This is a public-facing action.
     */
    public UserDTO registerClient(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email is already taken!");
        }

        User clientUser = new User();
        clientUser.setEmail(request.email());
        clientUser.setPassword(passwordEncoder.encode(request.password()));
        clientUser.setRole(Role.clientRole); // [cite: 25]

        User savedUser = userRepository.save(clientUser);

        // Return a DTO
        return new UserDTO(savedUser.getEmail(), savedUser.getRole().name());
    }

    /**
     * Creates a new ADMIN user.
     * This logic is protected and only callable by other Admins. [cite: 48]
     */
    public UserDTO createAdminUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email is already taken!");
        }

        User adminUser = new User();
        adminUser.setEmail(request.email());
        adminUser.setPassword(passwordEncoder.encode(request.password()));
        adminUser.setRole(Role.adminRole); // [cite: 24]

        User savedUser = userRepository.save(adminUser);

        // Return a DTO
        return new UserDTO(adminUser.getEmail(), adminUser.getRole().name());
    }

    /**
     * Finds a user by their email and returns a safe DTO.
     */
    public UserDTO findUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(user.getEmail(), user.getRole().name());
    }
}