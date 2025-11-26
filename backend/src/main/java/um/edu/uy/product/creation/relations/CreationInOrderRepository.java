package um.edu.uy.product.creation.relations;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CreationInOrderRepository extends JpaRepository<CreationInOrder, CreationInOrderKey> {
    @Query("SELECT cio FROM CreationInOrder cio " +
            "WHERE cio.creation.creationId = :creationId " +
            "AND cio.order.state = 'PENDING'")
    List<CreationInOrder> findPendingOrdersUsingCreation(Long creationId);
}