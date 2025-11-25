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

    private Double price;

    private boolean isAvailable;
}