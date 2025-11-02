package um.edu.uy.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "User") // no cambiar a "user" por conflicto con sql
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long userId;

    @Column(unique = true) // Your AuthController checks this!
    private String email;

    private String password;
    private String name;
    private String surname;

    @Enumerated(EnumType.STRING) // This tells JPA to store the role as a String
    private Role role;

    // --- UserDetails Methods ---
    // These methods are required by Spring Security

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // This tells Spring what "authority" or "role" the user has
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    // You can set these to true for simplicity for now
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
