package um.edu.uy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.uy.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
}
