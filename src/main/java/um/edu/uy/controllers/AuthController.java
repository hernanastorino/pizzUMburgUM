package um.edu.uy.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import um.edu.uy.entities.Role;
import um.edu.uy.entities.User;
import um.edu.uy.repositories.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // A simple DTO (Data Transfer Object) for the request body
    public static record RegisterRequest(String email, String password) {}

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        User client = new User();
        client.setEmail(request.email());
        client.setPassword(passwordEncoder.encode(request.password()));
        // New users are *always* clients, without privileges
        client.setRole(Role.clientRole);

        userRepository.save(client);

        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }
}
