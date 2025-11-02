package um.edu.uy.product.creation.pizza;

import jakarta.persistence.*;
import lombok.*;
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
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Pizza extends Creation {
    private String size;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dough_id", referencedColumnName = "doughId")
    private Dough dough;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cheese_type_id", referencedColumnName = "cheeseId")
    private Cheese cheese; // La relación "lleva_queso"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sauce_type_id", referencedColumnName = "sauceId")
    private Sauce sauce; // La relación "lleva_salsa"

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Pizza_Topping", // Nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "pizza_id", referencedColumnName = "pizzaId"), // FK a esta entidad (Pizza)
            inverseJoinColumns = @JoinColumn(name = "topping_id") // FK a la otra entidad (Topping)
    )
    private Set<Topping> toppings = new HashSet<>();

    public void addTopping(Topping topping) {
        this.toppings.add(topping);
        topping.getPizzas().add(this);
    }


}

