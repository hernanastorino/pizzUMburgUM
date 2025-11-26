package um.edu.uy.user.favorite.dto;

import um.edu.uy.product.creation.burger.Burger;
import um.edu.uy.product.creation.pizza.Pizza;
import um.edu.uy.product.creation.topping.Topping;
import um.edu.uy.user.favorite.FavoriteCreation;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public record FavoriteResponse(
        Long id, // ID del favorito
        Long creationId,
        String nombre,
        String tipo, // 'pizza' o 'hamburguesa'
        Double precioTotal,
        Map<String, Object> detalles, // Mapa dinámico para el frontend
        LocalDateTime favoredOn
) {
    public FavoriteResponse(FavoriteCreation fav) {
        this(
                fav.getId(),
                fav.getCreation().getCreationId(),
                fav.getCreation().getName(),
                determineType(fav.getCreation()),
                fav.getCreation().getUnitPrice(), // Calculamos precio actual
                extractDetails(fav.getCreation()),
                fav.getCreatedOn()
        );
    }

    private static String determineType(Object creation) {
        return (creation instanceof Pizza) ? "pizza" : "hamburguesa";
    }

    private static Map<String, Object> extractDetails(Object creation) {
        Map<String, Object> map = new HashMap<>();

        if (creation instanceof Pizza p) {
            map.put("tamaño", p.getSize());
            map.put("masa", p.getDough() != null ? p.getDough().getName() : "");
            map.put("salsa", p.getSauce() != null ? p.getSauce().getName() : "");
            map.put("queso", p.getCheese() != null ? p.getCheese().getName() : "");
            map.put("toppings", p.getToppings().stream().map(Topping::getName).toList());
        }
        else if (creation instanceof Burger b) {
            // Traducir cantidad de carne a texto visual
            String sizeText = switch (b.getMeatQuantity()) {
                case 1 -> "1 carne";
                case 2 -> "2 carnes";
                case 3 -> "3 carnes";
                default -> b.getMeatQuantity() + " carnes";
            };
            map.put("tamaño", sizeText);
            map.put("tipoCarne", b.getMeat() != null ? b.getMeat().getName() : "");
            map.put("pan", b.getBread() != null ? b.getBread().getName() : "");
            map.put("queso", b.getCondiment() != null ? b.getCondiment().getName() : ""); // Usamos condiment como queso/aderezo base
            map.put("toppings", b.getToppings().stream().map(Topping::getName).toList());
        }
        return map;
    }
}