package um.edu.uy.product.creation.topping;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(nullable = false)
    private String name;

    private Double priceSmall;
    private Double priceMedium;
    private Double priceLarge;

    @ManyToMany(mappedBy = "toppings")
    @JsonIgnore
    private Set<Burger> burgers = new HashSet<>();

    @ManyToMany(mappedBy = "toppings")
    @JsonIgnore
    private Set<Pizza> pizzas = new HashSet<>();

    private boolean isAvailable;

    public Double getPrice() { return priceSmall; }
}