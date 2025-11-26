package um.edu.uy.product.creation.pizza.options.sauce;

import jakarta.persistence.*;
import lombok.*;


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

    private Double priceSmall;  // 15cm
    private Double priceMedium; // 20cm
    private Double priceLarge;  // 25cm

    private boolean isAvailable;
}
