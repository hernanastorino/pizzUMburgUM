package um.edu.uy.product.creation.burger.options;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.burger.Burger;

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
