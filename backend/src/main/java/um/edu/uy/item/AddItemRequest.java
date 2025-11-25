package um.edu.uy.item;

public record AddItemRequest(
        Long productId,
        Integer quantity
) {
}