package um.edu.uy.item;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.order.Order;
import um.edu.uy.order.OrderRepository;
import um.edu.uy.product.beverage.relations.BeverageInOrder;
import um.edu.uy.product.beverage.relations.BeverageInOrderKey;
import um.edu.uy.product.beverage.relations.BeverageInOrderRepository;
import um.edu.uy.product.creation.relations.CreationInOrder;
import um.edu.uy.product.creation.relations.CreationInOrderKey;
import um.edu.uy.product.creation.relations.CreationInOrderRepository;
import um.edu.uy.product.side.relations.SideInOrder;
import um.edu.uy.product.side.relations.SideInOrderKey;
import um.edu.uy.product.side.relations.SideInOrderRepository;

@RestController
@RequestMapping("/api/orders/items")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ItemController {

    private final CreationInOrderRepository creationRepo;
    private final BeverageInOrderRepository beverageRepo;
    private final SideInOrderRepository sideRepo;
    private final OrderRepository orderRepo;

    public record UpdateItemRequest(Long orderId, Long productId, String type, int quantity) {}

    @PostMapping("/update")
    public ResponseEntity<?> updateItemQuantity(@RequestBody UpdateItemRequest req) {

        if ("creation".equals(req.type)) {
            CreationInOrderKey key = new CreationInOrderKey(req.orderId, req.productId);
            if (req.quantity <= 0) {
                creationRepo.deleteById(key);
            } else {
                CreationInOrder item = creationRepo.findById(key).orElseThrow();
                item.setCreationQuantity(req.quantity);
                item.calculateSubtotal();
                creationRepo.save(item);
            }
        }
        else if ("beverage".equals(req.type)) {
            BeverageInOrderKey key = new BeverageInOrderKey(req.orderId, req.productId);
            if (req.quantity <= 0) {
                beverageRepo.deleteById(key);
            } else {
                BeverageInOrder item = beverageRepo.findById(key).orElseThrow();
                item.setBeverageQuantity(req.quantity);
                item.setBeverageSubtotal(item.getBeverage().getPrice() * req.quantity);
                beverageRepo.save(item);
            }
        }
        else if ("side".equals(req.type)) {
            SideInOrderKey key = new SideInOrderKey(req.orderId, req.productId);
            if (req.quantity <= 0) {
                sideRepo.deleteById(key);
            } else {
                SideInOrder item = sideRepo.findById(key).orElseThrow();
                item.setSideQuantity(req.quantity);
                item.setSideSubtotal(item.getSide().getPrice() * req.quantity);
                sideRepo.save(item);
            }
        }

        recalculateOrderTotal(req.orderId);

        return ResponseEntity.ok("Item actualizado");
    }

    private void recalculateOrderTotal(Long orderId) {
        Order order = orderRepo.findById(orderId).orElseThrow();
        double total = 0.0;

        // sumar Creaciones
        total += order.getItemsCreation().stream().mapToDouble(CreationInOrder::getCreationSubtotal).sum();

        // sumar Bebidas
        total += order.getItemsBeverage().stream()
                .mapToDouble(i -> i.getBeverage().getPrice() * i.getBeverageQuantity()).sum();

        // sumar Sides
        total += order.getItemsSide().stream()
                .mapToDouble(i -> i.getSide().getPrice() * i.getSideQuantity()).sum();

        order.setTotal(total);
        orderRepo.save(order);
    }
}