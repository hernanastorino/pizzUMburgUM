package um.edu.uy.product.creation.pizza.options;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.burger.Burger;
import um.edu.uy.product.creation.pizza.Pizza;

import java.util.Collection;

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
    private long sauceId;

    @Column(nullable = false)
    private String name;


    private int price;

    @ManyToOne
    @JoinColumn(name = "burger_id")
    private Burger burger;

    @OneToOne(mappedBy = "dough")
    private Pizza pizza;

}
