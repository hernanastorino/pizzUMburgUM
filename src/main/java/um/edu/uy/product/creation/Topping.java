package um.edu.uy.product.creation;

import jakarta.persistence.*;
import lombok.*;
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
    private long toppingId;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "creation_id", nullable = false)
    private Creation creation;

    @ManyToMany(mappedBy = "toppings")
    private Set<Pizza> pizzas = new HashSet<>();

    @ManyToMany(mappedBy = "toppings")
    private Set<Hamburguesa> hamburguesas = new HashSet<>();
}
