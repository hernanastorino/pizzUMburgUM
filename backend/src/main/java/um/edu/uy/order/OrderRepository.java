package um.edu.uy.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // busca todos los pedidos de un cliente
    List<Order> findByClient_UserId(Long userId);

    // busca el pedido en carrito
    Optional<Order> findByClient_UserIdAndState(Long userId, OrderStatus state);

    // para DGI
    List<Order> findAllByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}