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
import um.edu.uy.user.dto.UserDTO;

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

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequest request) {
        UserDTO userDto = userService.registerClient(request);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.email());
        final String token = jwtService.generateToken(userDetails);
        String role = userDetails.getAuthorities().iterator().next().getAuthority();
        return ResponseEntity.ok(new AuthResponse(token, role));
    }
}