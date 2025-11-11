package um.edu.uy.product.creation.pizza.options;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.burger.Burger;
import um.edu.uy.product.creation.pizza.Pizza;


@Entity
@Table(name = "Sauce")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Sauce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sauceId;

    @Column(nullable = false)
    private String name;

    private Double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sauce_id", referencedColumnName = "sauceId")
    private Pizza pizza; // La relación "lleva_salsa"
}
