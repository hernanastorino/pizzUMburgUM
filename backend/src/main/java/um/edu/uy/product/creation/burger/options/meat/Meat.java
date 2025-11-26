package um.edu.uy.product.creation.burger.options.meat;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Meat")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Meat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long meatId;

    @Column(nullable = false)
    private String name;

    private Double priceSmall;  // 1 Carne
    private Double priceMedium; // 2 Carnes
    private Double priceLarge;  // 3 Carnes

    private boolean isAvailable;
}