package um.edu.uy.product.creation.pizza.options;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.pizza.Pizza;

@Entity
@Table(name = "Cheese")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cheese {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cheeseId;

    @Column(nullable = false)
    private String name;

    private int price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cheese_id", referencedColumnName = "cheeseId")
    private Pizza pizza; // La relación "lleva_queso"
}