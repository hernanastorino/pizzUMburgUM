package um.edu.uy.product.creation.burger.options.condiment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CondimentRepository extends JpaRepository<Condiment, Long> {
    boolean existsByName(String name);
    Optional<Condiment> findByName(String name);
}
