package um.edu.uy.product.creation.pizza.options.dough;

import jakarta.persistence.*;
import lombok.*;

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
    private Long doughId;

    @Column(nullable = false)
    private String name;

    private Double priceSmall;
    private Double priceMedium;
    private Double priceLarge;

    private boolean isAvailable;
}
