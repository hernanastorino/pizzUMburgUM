package um.edu.uy.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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
     */
    public UserDTO registerClient(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email is already taken!");
        }

        User clientUser = new User();
        clientUser.setEmail(request.email());
        clientUser.setPassword(passwordEncoder.encode(request.password()));

        // --- NEW: Save Name and Surname ---
        clientUser.setName(request.name());
        clientUser.setSurname(request.surname());

        clientUser.setRole(Role.clientRole);

        User savedUser = userRepository.save(clientUser);

        return new UserDTO(
                savedUser.getEmail(),
                savedUser.getRole().name(),
                savedUser.getName(),
                savedUser.getSurname()
        );
    }

    /**
     * Creates a new ADMIN user.
     */
    public UserDTO createAdminUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email is already taken!");
        }

        User adminUser = new User();
        adminUser.setEmail(request.email());
        adminUser.setPassword(passwordEncoder.encode(request.password()));

        // --- NEW: Save Name and Surname ---
        adminUser.setName(request.name());
        adminUser.setSurname(request.surname());

        adminUser.setRole(Role.adminRole);

        User savedUser = userRepository.save(adminUser);

        return new UserDTO(
                savedUser.getEmail(),
                savedUser.getRole().name(),
                savedUser.getName(),
                savedUser.getSurname()
        );
    }

    /**
     * Finds a user by their email.
     */
    public UserDTO findUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(
                user.getEmail(),
                user.getRole().name(),
                user.getName(),
                user.getSurname()
        );
    }
}