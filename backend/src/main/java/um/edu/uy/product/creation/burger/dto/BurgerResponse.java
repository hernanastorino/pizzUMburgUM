package um.edu.uy.product.creation.burger.dto;

import um.edu.uy.product.creation.topping.Topping;
import um.edu.uy.product.creation.burger.Burger;

import java.util.Set;
import java.util.stream.Collectors;

public record BurgerResponse(
        Long id,
        String name,
        Double subtotal,
        int meatQuantity,
        Long condimentId,
        Long breadId,
        Long meatId,
        Set<Long> toppingsId
) {
    public BurgerResponse(Burger burger) {
        this (
                burger.getCreationId(),
                burger.getName(),
                burger.getUnitPrice(),
                burger.getMeatQuantity(),
                burger.getCondiment() != null ? burger.getCondiment().getCondimentId() : null,
                burger.getBread() != null ? burger.getBread().getBreadId() : null,
                burger.getMeat() != null ? burger.getMeat().getMeatId() : null,
                burger.getToppings().stream().map(Topping::getToppingId).collect(Collectors.toSet())
        );
    }
}
