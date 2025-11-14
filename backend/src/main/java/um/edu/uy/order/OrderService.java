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

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

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
            existingBeverage.setBeverageQuantity(existingBeverage.getBeverageQuantity() + quantity);
        } else {
            BeverageInOrder line = BeverageInOrder.builder()
                    .id(key).order(order).beverage(beverage).beverageQuantity(quantity).build();

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
    public Order addBeverage(Order order, Side side, int quantity) {
        SideInOrderKey key = new SideInOrderKey(order.getId(), side.getSideId());

        Optional<SideInOrder> existingOption = order.getItemsSide().stream()
                .filter(item -> item.getId().equals(key))
                .findFirst();

        if (existingOption.isPresent()) {
            SideInOrder existingSide = existingOption.get();
            existingSide.setSideQuantity(existingSide.getSideQuantity() + quantity);
        } else {
            SideInOrder line = SideInOrder.builder()
                    .id(key).order(order).side(side).sideQuantity(quantity).build();

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
            existingCreation.setCreationQuantity(quantity);
        } else {
            CreationInOrder line = CreationInOrder.builder()
                    .id(key).order(order).creation(creation).CreationQuantity(quantity).build();

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

    private void recalculateTotal(Order order) {
        double total = 0;

        total += order.getItemsCreation().stream()
                .mapToDouble(item -> item.getCreation().getSubtotal() * item.getCreationQuantity()).sum();

        total += order.getItemsBeverage().stream()
                .mapToDouble(item -> item.getBeverage().getPrice() * item.getBeverageQuantity()).sum();

        total += order.getItemsSide().stream()
                .mapToDouble(item -> item.getSide().getPrice() * item.getSideQuantity()).sum();

        order.setTotal(total);
    }
}