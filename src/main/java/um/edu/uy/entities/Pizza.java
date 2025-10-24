package um.edu.uy.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Pizza")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Pizza extends Creation {
    @Column(name = "PizzaSize")
    private String size;

    @Column(name = "PizzaDough")
    private String dough;

    @Column(name = "PizzaSauce")
    private String sauce;

    @Column(name = "PizzaCheese")
    private String cheese;
}
