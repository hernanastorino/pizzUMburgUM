package um.edu.uy.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import um.edu.uy.security.dto.RegisterRequest;
import um.edu.uy.user.dto.PasswordChangeDto;
import um.edu.uy.user.dto.UserDTO;
import um.edu.uy.user.dto.UserProfileDto;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO registerClient(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email is already taken!");
        }

        User clientUser = new User();
        clientUser.setEmail(request.email());
        clientUser.setPassword(passwordEncoder.encode(request.password()));

        clientUser.setName(request.name());
        clientUser.setSurname(request.surname());

        clientUser.setRole(Role.clientRole);

        User savedUser = userRepository.save(clientUser);

        return new UserDTO(
                savedUser.getUserId(),
                savedUser.getEmail(),
                savedUser.getRole().name(),
                savedUser.getName(),
                savedUser.getSurname()
        );
    }

    public UserDTO createAdminUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email is already taken!");
        }

        User adminUser = new User();
        adminUser.setEmail(request.email());
        adminUser.setPassword(passwordEncoder.encode(request.password()));

        adminUser.setName(request.name());
        adminUser.setSurname(request.surname());
        adminUser.setPhone(request.phone());

        adminUser.setRole(Role.adminRole);

        User savedUser = userRepository.save(adminUser);

        return new UserDTO(
                savedUser.getUserId(),
                savedUser.getEmail(),
                savedUser.getRole().name(),
                savedUser.getName(),
                savedUser.getSurname()
        );
    }

    public UserDTO findUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(
                user.getUserId(),
                user.getEmail(),
                user.getRole().name(),
                user.getName(),
                user.getSurname()
        );
    }

    public User updateUserProfile(Long userId, UserProfileDto dto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getSurname() != null) user.setSurname(dto.getSurname());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        return userRepository.save(user);
    }

    public void changePassword(Long userId, PasswordChangeDto dto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // se valida el pass actual (usando el encoder inyectado)
        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("La contraseña actual es incorrecta");
        }
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
    }

    public long countEmployees() {
        return userRepository.countByRole(Role.adminRole);
    }
}