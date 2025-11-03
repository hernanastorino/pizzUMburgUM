package um.edu.uy.product.creation.burger;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.product.creation.Topping;
import um.edu.uy.product.creation.pizza.options.Sauce;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Burger")
@DiscriminatorValue("BURGER")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Burger extends Creation {

    //MISSING LINKS TO BREAD, CONDIMENT AND MEAT
    //@ManyToOne a TipoCarne, TipoPan
    //@ManyToMany a Aderezo, Topping

    private int meatQuantity;

    @OneToMany(mappedBy = "burger", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sauce> sauces = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Topping_Pizza", // Nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "pizza_id"), // FK a esta entidad (Pizza)
            inverseJoinColumns = @JoinColumn(name = "topping_id") // FK a la otra entidad (Topping)
    )
    private Set<Topping> toppings = new HashSet<>();

    public void addTopping(Topping topping) {
        this.toppings.add(topping);
        topping.getPizzas().add(this);
    }
}

