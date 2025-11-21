package um.edu.uy.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.user.favorite.FavoriteCreation;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "app_user") // no cambiar a User por conflicto con sql
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "TIPO_USUARIO")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true,nullable = false) // Your AuthController checks this!
    private String email;

    @Column(nullable = false)
    private String password;
    private String name;
    private String surname;
    private String phone;

    @Enumerated(EnumType.STRING) // This tells JPA to store the role as a String
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<FavoriteCreation> favoriteCreations = new HashSet<>();

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
