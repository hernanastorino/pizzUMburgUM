package um.edu.uy.product.beverage.relations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeverageInOrderRepository extends JpaRepository<BeverageInOrder, BeverageInOrderKey> {
}