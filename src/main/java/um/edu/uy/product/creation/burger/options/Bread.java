package um.edu.uy.product.creation.burger.options;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.burger.Burger;

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

    @Column(nullable = false)
    private Double price;

    @OneToOne(mappedBy = "breadId")
    private Burger burger; // La relación "lleva_pan"
}
