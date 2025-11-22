package um.edu.uy.product.creation.pizza.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import um.edu.uy.product.creation.pizza.options.Cheese;

import java.util.Optional;

@Repository
public interface CheeseRepository extends JpaRepository<Cheese, Long> {
    boolean existsByName(String name);
    Optional<Cheese> findByName(String name);
}
