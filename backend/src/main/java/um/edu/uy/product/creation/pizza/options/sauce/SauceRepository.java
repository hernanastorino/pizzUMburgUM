package um.edu.uy.product.creation.pizza.options.sauce;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SauceRepository extends JpaRepository<Sauce, Long> {
    boolean existsByName(String name);
    Optional<Sauce> findByName(String name);
}
