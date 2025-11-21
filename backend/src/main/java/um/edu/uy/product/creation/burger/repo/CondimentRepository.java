package um.edu.uy.product.creation.burger.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import um.edu.uy.product.creation.burger.options.Condiment;

@Repository
public interface CondimentRepository extends JpaRepository<Condiment, Long> {
    boolean existsByName(String name);
}
