package um.edu.uy.services;

// src/main/java/um/edu/uy/services/UserService.java
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import um.edu.uy.dto.RegisterRequestDTO; // We can reuse this DTO
import um.edu.uy.dto.UserDTO; // A new DTO for sending user data
import um.edu.uy.entities.Role;
import um.edu.uy.entities.User;
import um.edu.uy.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Creates a new user, specifically an Admin.
     * This logic is protected and only callable by other Admins.
     */
    public UserDTO createAdminUser(RegisterRequestDTO request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email is already taken!");
        }

        User adminUser = new User();
        adminUser.setEmail(request.email());
        adminUser.setPassword(passwordEncoder.encode(request.password()));
        adminUser.setRole(Role.adminRole); // Set role directly to ADMIN

        User savedUser = userRepository.save(adminUser);

        // Return a DTO, not the full entity
        return new UserDTO(savedUser.getEmail(), savedUser.getRole().name());
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
