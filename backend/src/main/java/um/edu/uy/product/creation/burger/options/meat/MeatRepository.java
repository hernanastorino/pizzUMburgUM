package um.edu.uy.product.creation.burger.options.meat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MeatRepository extends JpaRepository<Meat, Long> {
    boolean existsByName(String name);
    Optional<Meat> findByName(String name);
}
