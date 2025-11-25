package um.edu.uy.product.creation.pizza.options.cheese;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CheeseRepository extends JpaRepository<Cheese, Long> {
    boolean existsByName(String name);
    Optional<Cheese> findByName(String name);
}
