// src/main/java/um/edu/uy/security/AuthController.java
package um.edu.uy.security;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import um.edu.uy.security.dto.AuthResponse;
import um.edu.uy.security.dto.LoginRequest;
import um.edu.uy.security.dto.RegisterRequest;
import um.edu.uy.user.CustomUserDetailsService;
import um.edu.uy.user.UserService;
import um.edu.uy.user.UserDTO;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;

    public AuthController(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager, CustomUserDetailsService userDetailsService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Handles new CLIENT registrations.
     */
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequest request) {
        // The userService sets the role to ROLE_CLIENT by default
        UserDTO userDto = userService.registerClient(request);
        return ResponseEntity.ok(userDto);
    }

    /**
     * Handles login for ALL users (Clients and Admins).
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // 1. Authenticate
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        // 2. Fetch user details
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.email());

        // 3. Generate JWT
        final String token = jwtService.generateToken(userDetails);

        // 4. Get the Role (e.g., "ROLE_ADMIN" or "ROLE_CLIENT")
        String role = userDetails.getAuthorities().iterator().next().getAuthority();

        // 5. Send token AND role
        return ResponseEntity.ok(new AuthResponse(token, role));
    }
}