package um.edu.uy.order;

import um.edu.uy.item.ItemResponse;

import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        Long id,
        String clientName,
        String state,
        Double total,
        LocalDateTime date,
        String addressDescription,
        String paymentMethodName,
        List<ItemResponse> creations,
        List<ItemResponse> beverages,
        List<ItemResponse> sides
) {
    public OrderResponse(Order order) {
        this(
                order.getId(),
                order.getClient() != null ? order.getClient().getName() : null,
                order.getState(),
                order.getTotal(),
                order.getDate(),
                order.getAddress() != null ? order.getAddress().getName() : null,
                order.getPaymentMethod() != null ? order.getPaymentMethod().getCardName() : null,
                order.getItemsCreation().stream().map(ItemResponse::new).toList(),
                order.getItemsBeverage().stream().map(ItemResponse::new).toList(),
                order.getItemsSide().stream().map(ItemResponse::new).toList()
        );
    }
}
