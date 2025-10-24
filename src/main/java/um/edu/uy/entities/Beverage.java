package um.edu.uy.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Beverage")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Beverage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BeverageId")
    private long id;

    @Column(name = "BeverageName")
    private String name;

    @Column(name = "BeveragePrice")
    private int price;
}