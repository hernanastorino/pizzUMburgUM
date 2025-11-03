package um.edu.uy.product.creation.pizza.options;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.pizza.Pizza;

@Entity
@Table(name = "Dough")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Dough {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long doughId;

    @Column(nullable = false)
    private String name;

    private int price;

    @OneToOne(mappedBy = "doughId")
    private Pizza pizza; // La relación "lleva_dough"
}
