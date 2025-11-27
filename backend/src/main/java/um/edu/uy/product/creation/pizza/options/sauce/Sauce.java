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

    private Double priceSmall;
    private Double priceMedium;
    private Double priceLarge;

    private boolean isAvailable;
}
