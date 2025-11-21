package um.edu.uy.product.creation.pizza.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import um.edu.uy.product.creation.pizza.options.Sauce;

@Repository
public interface SauceRepository extends JpaRepository<Sauce, Long> {
    boolean existsByName(String name);
}
