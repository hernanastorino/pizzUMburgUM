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

    private Double priceSmall;  // 15cm
    private Double priceMedium; // 20cm
    private Double priceLarge;  // 25cm

    private boolean isAvailable;
}
