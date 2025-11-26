package um.edu.uy.product.creation.topping;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.burger.Burger;
import um.edu.uy.product.creation.pizza.Pizza;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Topping")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Topping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long toppingId;

    @Column(nullable = false, unique = true)
    private String name;

    private Double priceSmall;
    private Double priceMedium;
    private Double priceLarge;

    private boolean isAvailable;

    @ManyToMany(mappedBy = "toppings")
    private Set<Pizza> pizzas = new HashSet<>();

    @ManyToMany(mappedBy = "toppings")
    private Set<Burger> burgers = new HashSet<>();
}
