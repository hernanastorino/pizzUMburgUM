package um.edu.uy.product.beverage;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Beverage") //solo para cambiar nombre de clase en base de datos
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Beverage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "beverage_id")
    private Long beverageId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;
}