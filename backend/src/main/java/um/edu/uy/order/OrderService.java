package um.edu.uy.order;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import um.edu.uy.product.beverage.Beverage;
import um.edu.uy.product.beverage.BeverageRepository;
import um.edu.uy.product.beverage.relations.BeverageInOrder;
import um.edu.uy.product.beverage.relations.BeverageInOrderKey;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.product.creation.CreationRepository;
import um.edu.uy.product.creation.relations.CreationInOrder;
import um.edu.uy.product.creation.relations.CreationInOrderKey;
import um.edu.uy.product.side.Side;
import um.edu.uy.product.side.SideRepository;
import um.edu.uy.product.side.relations.SideInOrder;
import um.edu.uy.product.side.relations.SideInOrderKey;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;
import um.edu.uy.user.client.data.adress.Address;
import um.edu.uy.user.client.data.adress.AddressRepository;
import um.edu.uy.user.client.data.payment.method.PaymentMethod;
import um.edu.uy.user.client.data.payment.method.PaymentMethodRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PaymentMethodRepository paymentMethodRepository;

    private final BeverageRepository beverageRepository;
    private final SideRepository sideRepository;
    private final CreationRepository creationRepository;


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
        String userEmail = authentication.getName();

        boolean isAdmin = authentication.getAuthorities()
                .contains(new SimpleGrantedAuthority("adminRole"));

        try {
            Order order = this.getOrderById(id, userEmail, isAdmin);
            return ResponseEntity.ok(new OrderResponse(order));
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).build();
        }
    }

    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    public Order createOrderForUser(Long userId) {
        Optional<Order> pending = orderRepository.findByClient_UserIdAndState(userId, OrderStatus.PENDING);
        if (pending.isPresent()) return pending.get();

        User user = userRepository.findById(userId).orElseThrow();
        Order newOrder = Order.builder()
                .client(user)
                .state(OrderStatus.PENDING)
                .total(0.0)
                .date(LocalDateTime.now())
                .build();
        return orderRepository.save(newOrder);
    }


    @Transactional
    public Order addBeverageToOrder(Long orderId, Long beverageId, Integer quantity, String userEmail, boolean isAdmin) {
        Order order = getOrderById(orderId, userEmail, isAdmin);
        if (order.getState() != OrderStatus.PENDING) throw new RuntimeException("Cannot modify a confirmed order");

        Beverage beverage = beverageRepository.findById(beverageId)
                .orElseThrow(() -> new RuntimeException("Beverage not found"));

        return addBeverageInternal(order, beverage, quantity);
    }

    @Transactional
    public Order addSideToOrder(Long orderId, Long sideId, Integer quantity, String userEmail, boolean isAdmin) {
        Order order = getOrderById(orderId, userEmail, isAdmin);
        if (order.getState() != OrderStatus.PENDING) throw new RuntimeException("Cannot modify a confirmed order");

        Side side = sideRepository.findById(sideId)
                .orElseThrow(() -> new RuntimeException("Side not found"));

        return addSideInternal(order, side, quantity);
    }

    @Transactional
    public Order addCreationToOrder(Long orderId, Long creationId, Integer quantity, String userEmail, boolean isAdmin) {
        Order order = getOrderById(orderId, userEmail, isAdmin);
        if (order.getState() != OrderStatus.PENDING) throw new RuntimeException("Cannot modify a confirmed order");

        Creation creation = creationRepository.findById(creationId)
                .orElseThrow(() -> new RuntimeException("Creation not found"));

        if (!creation.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("You can only add your own creations");
        }

        return addOrUpdateCreationInternal(order, creation, quantity);
    }


    private Order addBeverageInternal(Order order, Beverage beverage, int quantity) {
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

    private Order addSideInternal(Order order, Side side, int quantity) {
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

    private Order addOrUpdateCreationInternal(Order order, Creation creation, int quantity) {
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


    @Transactional
    public Order confirmOrder(Long orderId, Long addressId, Long paymentId, String userEmail, boolean isAdmin) {
        Order order = getOrderById(orderId, userEmail, isAdmin);

        if (order.getState() != OrderStatus.PENDING) {
            throw new RuntimeException("Order is not pending confirmation");
        }

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        if (!address.getUser().getUserId().equals(order.getClient().getUserId())) {
            throw new RuntimeException("Address does not belong to the user");
        }

        PaymentMethod payment = paymentMethodRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment method not found"));
        if (!payment.getUser().getUserId().equals(order.getClient().getUserId())) {
            throw new RuntimeException("Payment method does not belong to the user");
        }

        order.setAddress(address);
        order.setPaymentMethod(payment);
        order.setState(OrderStatus.CONFIRMED);
        order.setDate(LocalDateTime.now());

        return orderRepository.save(order);
    }

    public Order advanceState(Long orderId, boolean isAdmin) {
        if (!isAdmin) throw new RuntimeException("Access Denied: Only admins can advance order state.");

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

    public List<OrderResponse> getSalesForDateRange(LocalDate from, LocalDate to) {
        LocalDateTime startOfDay = from.atStartOfDay();
        LocalDateTime endOfDay = to.atTime(LocalTime.MAX);

        List<Order> orders = orderRepository.findAllByDateBetween(startOfDay, endOfDay);

        return orders.stream()
                .filter(o -> o.getState() != OrderStatus.PENDING && o.getState() != OrderStatus.CANCELLED)
                .map(OrderResponse::new)
                .toList();
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByClient_UserId(userId);
    }
}