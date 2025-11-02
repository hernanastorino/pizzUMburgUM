package um.edu.uy.product.creation.pizza.options;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.burger.Burger;

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
    @Column(name = "sauce_id")
    private long sauceId;

    @Column(name = "sauce_name")
    private String name;

    @Column(name = "sauce_price")
    private int price;

    @ManyToOne
    @JoinColumn(name = "burger_id")
    private Burger burger;
}
