package um.edu.uy.product.creation.pizza.dto;

import java.util.Set;

public record PizzaRequest(
        Long userId,
        String name,
        String size,
        Long doughId,
        Long cheeseId,
        Long sauceId,
        Set<Long> toppingIds
) {
}
