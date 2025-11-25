package um.edu.uy.product.creation.burger.options.condiment;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Condiment")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Condiment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long condimentId;

    @Column(nullable = false)
    private String name;

    private Double price;

    private boolean isAvailable;
}
