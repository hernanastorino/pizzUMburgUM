package um.edu.uy.product.creation.burger.dto;

import java.util.Set;

public record BurgerRequest(
        Long userId,
        String name,
        int meatQuantity,
        Long condimentId,
        Long breadId,
        Long meatId,
        Set<Long> toppingIds
) {

}
