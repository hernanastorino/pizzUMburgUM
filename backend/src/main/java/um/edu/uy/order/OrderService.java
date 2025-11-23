package um.edu.uy.order;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import um.edu.uy.product.beverage.Beverage;
import um.edu.uy.product.beverage.relations.BeverageInOrder;
import um.edu.uy.product.beverage.relations.BeverageInOrderKey;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.product.creation.relations.CreationInOrder;
import um.edu.uy.product.creation.relations.CreationInOrderKey;
import um.edu.uy.product.side.Side;
import um.edu.uy.product.side.relations.SideInOrder;
import um.edu.uy.product.side.relations.SideInOrderKey;
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

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
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
        Optional<Order> pending = orderRepository.findByClient_UserIdAndState(userId, "PENDING");
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
    public Order confirmOrder(Long orderId, Long addressId, Long paymentId) {
        // 1. Buscar la orden
        Order order = getOrderById(orderId);

        // 2. Validar estado (solo se confirma si está PENDING)
        // Si usás Enum en la entidad: if (order.getState() != OrderStatus.PENDING)
        if (order.getState() != OrderStatus.PENDING) {
            throw new RuntimeException("Orden no pendiente");
        }

        // 3. Buscar y Validar Dirección
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));

        // Seguridad: Verificar que la dirección pertenezca al dueño de la orden
        if (!address.getUser().getUserId().equals(order.getClient().getUserId())) {
            throw new RuntimeException("La dirección no pertenece al usuario de la orden");
        }

        // 4. Buscar y Validar Medio de Pago
        PaymentMethod payment = paymentMethodRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Método de pago no encontrado"));

        if (!payment.getUser().getUserId().equals(order.getClient().getUserId())) {
            throw new RuntimeException("El método de pago no pertenece al usuario");
        }

        // 5. SETEAR ALL
        order.setAddress(address);
        order.setPaymentMethod(payment);

        // 6. Cambiar Estado y Fecha
        order.setState(OrderStatus.CONFIRMED); // O usar el Enum directo si cambiaste la entidad
        order.setDate(LocalDateTime.now()); // Fecha real de la compra

        return orderRepository.save(order);
    }

    // avanzar estado manual para la demo
    public Order advanceState(Long orderId) {
        Order order = getOrderById(orderId);

        OrderStatus current = order.getState();

        OrderStatus next = switch (current) {
            case CONFIRMED -> OrderStatus.PREPARING;
            case PREPARING -> OrderStatus.SENT;
            case SENT -> OrderStatus.DELIVERED;
            default -> current;
        };

        order.setState(next);
        return orderRepository.save(order);
    }

    public void cancelOrder(Long orderId) {
        Order order = getOrderById(orderId);
        order.setState(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}