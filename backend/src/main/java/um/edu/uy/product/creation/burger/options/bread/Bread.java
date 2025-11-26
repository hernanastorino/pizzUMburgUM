package um.edu.uy.product.creation.burger.options.bread;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Bread")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Bread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long breadId;

    @Column(nullable = false)
    private String name;

    private Double priceSmall;  // 1 Carne
    private Double priceMedium; // 2 Carnes
    private Double priceLarge;  // 3 Carnes

    private boolean isAvailable;
}
