package um.edu.uy.product.beverage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeverageRepository extends JpaRepository<Beverage, Long> {
}