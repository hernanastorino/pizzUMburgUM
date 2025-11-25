package um.edu.uy.order;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    public Order getOrderById(Long id, String userEmail, boolean isAdmin) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!isAdmin && !order.getClient().getEmail().equals(userEmail)) {
            throw new RuntimeException("Access Denied: You do not own this order.");
        }
        return order;
    }

    // iniciar carrito o recuperar existente
    @PostMapping("/start/user/{userId}")
    public ResponseEntity<Order> startOrder(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.createOrderForUser(userId));
    }

    // checkout
    @PostMapping("/{id}/confirm")
    public ResponseEntity<?> confirmOrder(@PathVariable Long id,
                                          @RequestParam Long addressId,
                                          @RequestParam Long paymentId,
                                          Authentication authentication) {
        String userEmail = authentication.getName();
        boolean isAdmin = authentication.getAuthorities()
                .contains(new SimpleGrantedAuthority("adminRole"));

        try {
            // Pass credentials to service
            Order confirmedOrder = orderService.confirmOrder(id, addressId, paymentId, userEmail, isAdmin);
            return ResponseEntity.ok(confirmedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // boton de avanzar estado
    @PostMapping("/{id}/advance")
    public ResponseEntity<?> advanceState(@PathVariable Long id, Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities()
                .contains(new SimpleGrantedAuthority("adminRole"));

        try {
            return ResponseEntity.ok(orderService.advanceState(id, isAdmin));
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        boolean isAdmin = authentication.getAuthorities()
                .contains(new SimpleGrantedAuthority("adminRole"));

        try {
            orderService.cancelOrder(id, userEmail, isAdmin);
            return ResponseEntity.ok("Orden cancelada");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}