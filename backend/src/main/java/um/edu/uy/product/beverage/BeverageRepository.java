package um.edu.uy.product.beverage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BeverageRepository extends JpaRepository<Beverage, Long> {
    boolean existsByName(String name);
    Optional<Beverage> findByName(String name);
}