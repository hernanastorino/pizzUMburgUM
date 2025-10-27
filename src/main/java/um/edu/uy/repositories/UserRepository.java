package um.edu.uy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.uy.entities.Role;
import um.edu.uy.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByRole(Role role);
}
