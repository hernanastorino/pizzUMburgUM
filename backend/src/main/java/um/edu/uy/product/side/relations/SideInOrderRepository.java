package um.edu.uy.product.side.relations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SideInOrderRepository extends JpaRepository<SideInOrder, SideInOrderKey> {
}