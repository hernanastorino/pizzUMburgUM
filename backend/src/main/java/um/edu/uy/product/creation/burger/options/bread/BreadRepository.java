package um.edu.uy.product.creation.burger.options.bread;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BreadRepository extends JpaRepository<Bread, Long> {
    boolean existsByName(String name);
    Optional<Bread> findByName(String name);
}