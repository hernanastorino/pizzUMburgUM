package um.edu.uy.product.creation.burger.options;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.burger.Burger;

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

    private Double price;

}