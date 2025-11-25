package um.edu.uy.product.creation.pizza;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.product.creation.Topping;
import um.edu.uy.product.creation.pizza.options.Cheese;
import um.edu.uy.product.creation.pizza.options.Dough;
import um.edu.uy.product.creation.pizza.options.Sauce;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Pizza")
@DiscriminatorValue("PIZZA") // Valor que se guarda en la columna "creation_type"
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "creationId")
public class Pizza extends Creation {

    /*@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pizzaId;*/

    private String size;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dough_id", referencedColumnName = "doughId")
    private Dough dough; // La relación "lleva_masa"

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cheese_type_id", referencedColumnName = "cheeseId")
    private Cheese cheese; // La relación "lleva_queso"

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sauce_type_id", referencedColumnName = "sauceId")
    private Sauce sauce; // La relación "lleva_salsa"

    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "Pizza_Topping", // Nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "creation_id", referencedColumnName = "creationId"), // FK a esta entidad (Pizza)
            inverseJoinColumns = @JoinColumn(name = "topping_id") // FK a la otra entidad (Topping)
    )
    private Set<Topping> toppings = new HashSet<>();

    public void addTopping(Topping topping) {
        this.toppings.add(topping);
        topping.getPizzas().add(this);
    }

    @Override
    public double getUnitPrice() {
        double total = 0.0;

        if (this.dough != null) {
            total += this.dough.getPrice();
        }

        if (this.cheese != null) {
            total += this.cheese.getPrice();
        }

        if (this.sauce != null) {
            total += this.sauce.getPrice();
        }

        if (this.toppings != null && !this.toppings.isEmpty()) {
            total += this.toppings.stream()
                    .mapToDouble(Topping::getPrice)
                    .sum();
        }
        return total;
    }
}