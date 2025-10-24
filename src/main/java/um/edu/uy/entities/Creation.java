package um.edu.uy.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Creation")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public abstract class Creation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "CreationSubtotal")
    private int subtotal;

    @OneToMany(mappedBy = "creation")
    private List<Topping> toppings = new ArrayList<>();
}
