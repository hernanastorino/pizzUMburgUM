package um.edu.uy.product.creation.pizza.options.cheese;

import jakarta.persistence.*;
import lombok.*;

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
    private Long cheeseId;

    @Column(nullable = false)
    private String name;

    private Double priceSmall;  // 15cm
    private Double priceMedium; // 20cm
    private Double priceLarge;  // 25cm

    private boolean isAvailable;
}