package um.edu.uy.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import um.edu.uy.order.Order;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Buscar todos los pedidos de un cliente
    List<Order> findByClient_UserId(Long userId);

    // Buscar el pedido "en curso" (Carrito)
    // Asumiendo que el campo 'state' es un String
    Optional<Order> findByClient_UserIdAndState(Long userId, String state);
}