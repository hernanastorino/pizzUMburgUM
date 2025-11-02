package um.edu.uy.security;

import lombok.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import um.edu.uy.user.UserRepository;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Allows for @PreAuthorize annotations
@RequiredArgsConstructor // Injects the final fields
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserRepository userRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Disable CSRF, as we are not using Cookies/Sessions
                .csrf(csrf -> csrf.disable())

                // 2. Enable CORS (Cross-Origin Resource Sharing)
                // This is necessary for your React app (localhost:3000)
                // to talk to your Spring app (localhost:8080)
                .cors(cors -> cors.configure(http)) // Will use a default Bean

                // 3. Set session management to STATELESS
                // We are using a token (JWT), not a session
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                // 4. Define the URL security rules
                .authorizeHttpRequests(auth -> auth
                        // Allow public access to registration and login
                        .requestMatchers("/api/auth/**").permitAll()

                        // Secure Admin routes
                        // [cite: 48, 49, 50, 51]
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // Secure Client routes
                        // [cite: 42, 43, 44, 45, 46]
                        .requestMatchers("/api/client/**").hasRole("CLIENT")

                        // All other requests must be authenticated
                        .anyRequest().authenticated()
                );

        // This is a placeholder. We will replace this with our
        // JWT filter in the next step.
        // http.httpBasic(Customizer.withDefaults());
        // Add our JWT filter *before* the standard username/password filter


        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // This is how Spring will load a user from your database
        return username -> userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // The standard password hasher
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        // A bean Spring uses to manage the authentication process
        return config.getAuthenticationManager();
    }

    // This bean is used by the AuthenticationManager to process authentication
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
}