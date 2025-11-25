package um.edu.uy.product.creation.pizza.dto;

import um.edu.uy.product.creation.topping.Topping;
import um.edu.uy.product.creation.pizza.Pizza;

import java.util.Set;
import java.util.stream.Collectors;

public record PizzaResponse(
    Long id,
    String name,
    Double subtotal,
    String size,
    Long doughId,
    Long cheeseId,
    Long sauceId,
    Set<Long> toppingsId
) {
    public PizzaResponse(Pizza pizza) {
        this (
                pizza.getCreationId(),
                pizza.getName(),
                pizza.getUnitPrice(),
                pizza.getSize(),
                pizza.getDough() != null ? pizza.getDough().getDoughId() : null,
                pizza.getCheese() != null ? pizza.getCheese().getCheeseId() : null,
                pizza.getSauce() != null ? pizza.getSauce().getSauceId() : null,
                pizza.getToppings().stream().map(Topping::getToppingId).collect(Collectors.toSet())
        );
    }
}
