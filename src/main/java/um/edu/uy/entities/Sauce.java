package um.edu.uy.entities;

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
    @Column(name = "SauceId")
    private long id;

    @Column(name = "SauceName")
    private String name;

    @Column(name = "SaucePrice")
    private int price;

    @ManyToOne
    @JoinColumn(name = "Burger_ID")
    private Burger burger;
}
