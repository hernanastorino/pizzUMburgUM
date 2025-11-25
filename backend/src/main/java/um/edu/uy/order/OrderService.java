package um.edu.uy.order;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import um.edu.uy.product.beverage.Beverage;
import um.edu.uy.product.beverage.relations.BeverageInOrder;
import um.edu.uy.product.beverage.relations.BeverageInOrderKey;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.product.creation.relations.CreationInOrder;
import um.edu.uy.product.creation.relations.CreationInOrderKey;
import um.edu.uy.product.side.Side;
import um.edu.uy.product.side.relations.SideInOrder;
import um.edu.uy.product.side.relations.SideInOrderKey;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;
import um.edu.uy.user.client.data.adress.Address;
import um.edu.uy.user.client.data.adress.AddressRepository;
import um.edu.uy.user.client.data.payment.method.PaymentMethod;
import um.edu.uy.user.client.data.payment.method.PaymentMethodRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PaymentMethodRepository paymentMethodRepository;

    public Order getOrderById(Long id, String userEmail, boolean isAdmin) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!isAdmin && !order.getClient().getEmail().equals(userEmail)) {
            throw new RuntimeException("Access Denied: You do not own this order.");
        }
        return order;
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long id, Authentication authentication) {
        // 1. Get the email of the logged-in user
        String userEmail = authentication.getName();

        // 2. Check if the user is an Admin
        // (Matches the string "adminRole" defined in your Role enum)
        boolean isAdmin = authentication.getAuthorities()
                .contains(new SimpleGrantedAuthority("adminRole"));

        // 3. Pass all this info to the service
        try {
            Order order = this.getOrderById(id, userEmail, isAdmin);
            return ResponseEntity.ok(new OrderResponse(order));
        } catch (RuntimeException e) {
            // This catches the "Access Denied" or "Not Found" errors
            return ResponseEntity.status(403).build(); // or 404
        }
    }

    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Order order) {
        orderRepository.delete(order);
    }

    @Transactional
    public Order addBeverage(Order order, Beverage beverage, int quantity) {
        BeverageInOrderKey key = new BeverageInOrderKey(order.getId(), beverage.getBeverageId());

        Optional<BeverageInOrder> existingOption = order.getItemsBeverage().stream()
                .filter(item -> item.getId().equals(key))
                .findFirst();

        if (existingOption.isPresent()) {
            BeverageInOrder existingBeverage = existingOption.get();
            int newQuantity = existingBeverage.getBeverageQuantity() + quantity;
            existingBeverage.setBeverageQuantity(newQuantity);
            existingBeverage.setBeverageSubtotal(beverage.getPrice() * newQuantity);
        } else {
            BeverageInOrder line = BeverageInOrder.builder()
                    .id(key)
                    .order(order)
                    .beverage(beverage)
                    .beverageQuantity(quantity)
                    .beverageSubtotal(beverage.getPrice() * quantity)
                    .build();

            order.getItemsBeverage().add(line);
        }
        recalculateTotal(order);
        return orderRepository.save(order);
    }

    @Transactional
    public Order removeBeverage(Order order, Beverage beverage) {
        order.getItemsBeverage().removeIf(
                item -> item.getBeverage().getBeverageId().equals(beverage.getBeverageId())
        );

        recalculateTotal(order);
        return orderRepository.save(order);
    }

    @Transactional
    public Order addSide(Order order, Side side, int quantity) {
        SideInOrderKey key = new SideInOrderKey(order.getId(), side.getSideId());

        Optional<SideInOrder> existingOption = order.getItemsSide().stream()
                .filter(item -> item.getId().equals(key))
                .findFirst();

        if (existingOption.isPresent()) {
            SideInOrder existingSide = existingOption.get();
            int newQuantity = existingSide.getSideQuantity() + quantity;
            existingSide.setSideQuantity(newQuantity);
            existingSide.setSideSubtotal(side.getPrice() * newQuantity);
        } else {
            SideInOrder line = SideInOrder.builder()
                    .id(key)
                    .order(order)
                    .side(side)
                    .sideQuantity(quantity)
                    .sideSubtotal(side.getPrice() * quantity)
                    .build();

            order.getItemsSide().add(line);
        }
        recalculateTotal(order);
        return orderRepository.save(order);
    }

    @Transactional
    public Order removeSide(Order order, Side side) {
        order.getItemsSide().removeIf(
                item -> item.getSide().getSideId().equals(side.getSideId())
        );

        recalculateTotal(order);
        return orderRepository.save(order);
    }

    @Transactional
    public Order addOrUpdateCreation(Order order, Creation creation, int quantity) {

        CreationInOrderKey key = new CreationInOrderKey(order.getId(), creation.getCreationId());

        Optional<CreationInOrder> existingOption = order.getItemsCreation().stream()
                .filter(item -> item.getId().equals(key))
                .findFirst();

        if (existingOption.isPresent()) {
            CreationInOrder existingCreation = existingOption.get();
            int newQuantity = existingCreation.getCreationQuantity() + quantity;
            existingCreation.setCreationQuantity(newQuantity);
            existingCreation.setCreationSubtotal(creation.getUnitPrice() * newQuantity);

        } else {
            CreationInOrder line = CreationInOrder.builder()
                    .id(key)
                    .order(order)
                    .creation(creation)
                    .CreationQuantity(quantity)
                    .creationSubtotal(creation.getUnitPrice() * quantity)
                    .build();

            order.getItemsCreation().add(line);
        }
        recalculateTotal(order);
        return orderRepository.save(order);
    }

    @Transactional
    public Order removeCreation(Order order, Creation creation) {
        order.getItemsCreation().removeIf(
                item -> item.getCreation().getCreationId().equals(creation.getCreationId())
        );

        recalculateTotal(order);
        return orderRepository.save(order);
    }

    public void recalculateTotal(Order order) {
        double total = 0;

        if (order.getItemsCreation() != null) {
            total += order.getItemsCreation().stream()
                    .mapToDouble(item -> item.getCreation().getUnitPrice() * item.getCreationQuantity()).sum();
        }

        if (order.getItemsBeverage() != null) {
            total += order.getItemsBeverage().stream()
                    .mapToDouble(item -> item.getBeverage().getPrice() * item.getBeverageQuantity()).sum();
        }

        if (order.getItemsSide() != null) {
            total += order.getItemsSide().stream()
                    .mapToDouble(item -> item.getSide().getPrice() * item.getSideQuantity()).sum();
        }

        order.setTotal(total);
    }

    public Order createOrderForUser(Long userId) {
        // verificar si ya tiene una pendiente
        Optional<Order> pending = orderRepository.findByClient_UserIdAndState(userId, OrderStatus.PENDING);
        if (pending.isPresent()) return pending.get();

        User user = userRepository.findById(userId).orElseThrow();
        Order newOrder = Order.builder()
                .client(user)
                .state(OrderStatus.PENDING)
                .total(0.0)
                .date(LocalDateTime.now()) // Fecha de creación
                .build();
        return orderRepository.save(newOrder);
    }

    @Transactional
    public Order confirmOrder(Long orderId, Long addressId, Long paymentId, String userEmail, boolean isAdmin) {
        // 1. SECURE FETCH: This ensures "Client A" cannot confirm "Client B's" order
        Order order = getOrderById(orderId, userEmail, isAdmin);

        // 2. Validate State
        if (order.getState() != OrderStatus.PENDING) {
            throw new RuntimeException("Order is not pending confirmation");
        }

        // 3. Fetch & Validate Address
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // Security: Ensure address belongs to the order owner
        if (!address.getUser().getUserId().equals(order.getClient().getUserId())) {
            throw new RuntimeException("Address does not belong to the user");
        }

        // 4. Fetch & Validate Payment
        PaymentMethod payment = paymentMethodRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment method not found"));

        // Security: Ensure payment belongs to the order owner
        if (!payment.getUser().getUserId().equals(order.getClient().getUserId())) {
            throw new RuntimeException("Payment method does not belong to the user");
        }

        order.setAddress(address);
        order.setPaymentMethod(payment);
        order.setState(OrderStatus.CONFIRMED);
        order.setDate(LocalDateTime.now());

        return orderRepository.save(order);
    }

    // avanzar estado manual para la demo
    public Order advanceState(Long orderId, boolean isAdmin) {
        if (!isAdmin) {
            throw new RuntimeException("Access Denied: Only admins can advance order state.");
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderStatus current = order.getState();
        OrderStatus next = switch (current) {
            case PENDING -> OrderStatus.CONFIRMED;
            case CONFIRMED -> OrderStatus.PREPARING;
            case PREPARING -> OrderStatus.SENT;
            case SENT -> OrderStatus.DELIVERED;
            default -> current;
        };

        order.setState(next);
        return orderRepository.save(order);
    }

    public void cancelOrder(Long orderId, String userEmail, boolean isAdmin) {
        Order order = getOrderById(orderId, userEmail, isAdmin);

        if (order.getState() == OrderStatus.SENT || order.getState() == OrderStatus.DELIVERED) {
            throw new RuntimeException("Cannot cancel an order that is already on the way.");
        }

        order.setState(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}