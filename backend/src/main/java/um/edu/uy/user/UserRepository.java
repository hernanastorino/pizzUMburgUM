package um.edu.uy.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByRole(Role role);
    Optional<User> findFirstByRole(Role role);

    // para BPS
    long countByRole(Role role);
}
