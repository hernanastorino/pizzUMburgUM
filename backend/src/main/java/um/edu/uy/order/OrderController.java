package um.edu.uy.order;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import um.edu.uy.item.AddItemRequest;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().contains(new SimpleGrantedAuthority("adminRole"));
        try {
            Order order = orderService.getOrderById(id, userEmail, isAdmin);
            return ResponseEntity.ok(new OrderResponse(order));
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).build();
        }
    }

    // Iniciar carrito o recuperar existente
    @PostMapping("/start/user/{userId}")
    public ResponseEntity<Order> startOrder(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.createOrderForUser(userId));
    }

    // --- AGREGAR ITEMS ---

    @PostMapping("/{id}/items/beverages")
    public ResponseEntity<OrderResponse> addBeverage(@PathVariable Long id,
                                                     @RequestBody AddItemRequest request,
                                                     Authentication authentication) {
        String userEmail = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().contains(new SimpleGrantedAuthority("adminRole"));

        Order updatedOrder = orderService.addBeverageToOrder(id, request.productId(), request.quantity(), userEmail, isAdmin);
        return ResponseEntity.ok(new OrderResponse(updatedOrder));
    }

    @PostMapping("/{id}/items/sides")
    public ResponseEntity<OrderResponse> addSide(@PathVariable Long id,
                                                 @RequestBody AddItemRequest request,
                                                 Authentication authentication) {
        String userEmail = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().contains(new SimpleGrantedAuthority("adminRole"));

        Order updatedOrder = orderService.addSideToOrder(id, request.productId(), request.quantity(), userEmail, isAdmin);
        return ResponseEntity.ok(new OrderResponse(updatedOrder));
    }

    @PostMapping("/{id}/items/creations")
    public ResponseEntity<OrderResponse> addCreation(@PathVariable Long id,
                                                     @RequestBody AddItemRequest request,
                                                     Authentication authentication) {
        String userEmail = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().contains(new SimpleGrantedAuthority("adminRole"));

        Order updatedOrder = orderService.addCreationToOrder(id, request.productId(), request.quantity(), userEmail, isAdmin);
        return ResponseEntity.ok(new OrderResponse(updatedOrder));
    }

    // --- FLUJO DE ESTADOS ---

    @PostMapping("/{id}/confirm")
    public ResponseEntity<?> confirmOrder(@PathVariable Long id,
                                          @RequestParam Long addressId,
                                          @RequestParam Long paymentId,
                                          Authentication authentication) {
        String userEmail = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().contains(new SimpleGrantedAuthority("adminRole"));

        try {
            Order confirmedOrder = orderService.confirmOrder(id, addressId, paymentId, userEmail, isAdmin);
            return ResponseEntity.ok(new OrderResponse(confirmedOrder));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/advance")
    public ResponseEntity<?> advanceState(@PathVariable Long id, Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().contains(new SimpleGrantedAuthority("adminRole"));
        try {
            Order order = orderService.advanceState(id, isAdmin);
            return ResponseEntity.ok(new OrderResponse(order));
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().contains(new SimpleGrantedAuthority("adminRole"));

        try {
            orderService.cancelOrder(id, userEmail, isAdmin);
            return ResponseEntity.ok("Orden cancelada");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().contains(new SimpleGrantedAuthority("adminRole"));
        if (!isAdmin) return ResponseEntity.status(403).build();

        List<Order> orders = orderService.findAllOrders();

        List<Order> filteredOrders = orders.stream()
                .filter(o -> o.getState() != OrderStatus.PENDING)
                .toList();

        return ResponseEntity.ok(filteredOrders);
    }
}