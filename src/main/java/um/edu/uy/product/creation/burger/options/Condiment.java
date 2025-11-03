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
    private long condimentId;

    @Column(nullable = false)
    private String name;

    private int price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "condiment_id", referencedColumnName = "condimentId")
    private Burger burger; // La relación "lleva_aderezo"
}
