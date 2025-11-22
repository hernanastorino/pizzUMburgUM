package um.edu.uy.order;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long id) {
        var order = orderService.getOrderById(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new OrderResponse(order));
    }

    // iniciar carrito o recuperar existente
    @PostMapping("/start/user/{userId}")
    public ResponseEntity<Order> startOrder(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.createOrderForUser(userId));
    }

    // checkout
    @PostMapping("/{id}/confirm")
    public ResponseEntity<Order> confirm(@PathVariable Long id,
                                         @RequestParam Long addressId,
                                         @RequestParam Long paymentId) {
        // Acá deberías buscar las entidades Address y Payment y pasarlas al servicio
        return ResponseEntity.ok(orderService.confirmOrder(id, addressId, paymentId));
    }

    // boton de avanzar estado
    @PostMapping("/{id}/advance")
    public ResponseEntity<Order> advanceState(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.advanceState(id));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id) {
        orderService.cancelOrder(id);
        return ResponseEntity.ok("Orden cancelada");
    }
}