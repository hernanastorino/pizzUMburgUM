package um.edu.uy.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Burger")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Burger extends Creation {
    @Column(name = "BurgerMeat")
    private String meat;

    @Column(name = "BurgeramountOfMeats")
    private int amountOfMeats;

    @Column(name = "BurgerBread")
    private String bread;

    @OneToMany(mappedBy = "burger", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sauce> sauces = new ArrayList<>();
}
