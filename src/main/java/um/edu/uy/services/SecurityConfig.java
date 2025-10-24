package um.edu.uy.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Allows using @PreAuthorize for admin-only methods
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // ALWAYS hash passwords
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Since this is a REST API for a React frontend, disable CSRF
                // (You'll likely use tokens or other methods later)
                .csrf(csrf -> csrf.disable())

                // Configure authorization rules
                .authorizeHttpRequests(authz -> authz
                        // Allow anyone to access the registration endpoint
                        .requestMatchers("/api/auth/register").permitAll()
                        // Allow anyone to attempt to log in
                        .requestMatchers("/api/auth/login").permitAll()
                        // All other requests must be authenticated
                        .anyRequest().authenticated()
                )

                // Configure the login process
                .formLogin(form -> form
                        // This is the URL your React app will POST to
                        .loginProcessingUrl("/api/auth/login")
                        // On success, return 200 OK (React will handle redirect)
                        .successHandler((req, res, auth) -> res.setStatus(HttpStatus.OK.value()))
                        // On failure, return 401 Unauthorized
                        .failureHandler((req, res, ex) -> res.setStatus(HttpStatus.UNAUTHORIZED.value()))
                        .permitAll()
                )

                // Configure logout
                .logout(logout -> logout
                        .logoutUrl("/api/auth/logout")
                        // On success, return 200 OK
                        .logoutSuccessHandler((req, res, auth) -> res.setStatus(HttpStatus.OK.value()))
                )

                // If an unauthenticated user tries to access a protected resource,
                // return 401 Unauthorized instead of redirecting to a login page
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                );

        return http.build();
    }
}
