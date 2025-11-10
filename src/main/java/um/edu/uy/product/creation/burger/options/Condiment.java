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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "burger_id", referencedColumnName = "burgerId")
    private Burger burger; // La relación "lleva_aderezo"
}
