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

    private Double priceSmall;
    private Double priceMedium;
    private Double priceLarge;

    private boolean isAvailable;
}