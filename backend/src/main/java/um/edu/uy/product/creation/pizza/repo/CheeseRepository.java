package um.edu.uy.product.creation.pizza.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import um.edu.uy.product.creation.pizza.options.Cheese;

@Repository
public interface CheeseRepository extends JpaRepository<Cheese, Long> {
}
