package um.edu.uy.product.creation.pizza.options.dough;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoughRepository extends JpaRepository<Dough, Long> {
    boolean existsByName(String name);
    Optional<Dough> findByName(String name);
}
