package um.edu.uy.product.creation.burger;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.product.creation.Topping;
import um.edu.uy.product.creation.burger.options.Bread;
import um.edu.uy.product.creation.burger.options.Condiment;
import um.edu.uy.product.creation.burger.options.Meat;

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
    private int meatQuantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "condiment_id", referencedColumnName = "condimentId")
    private Condiment condiment; // La relación "lleva_aderezo"

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bread_id", referencedColumnName = "breadId")
    private Bread bread; // La relación "lleva_pan"

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meat_id", referencedColumnName = "meatId")
    private Meat meat; // La relación "lleva_carne"

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "Topping_Pizza", // Nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "pizza_id"), // FK a esta entidad (Pizza)
            inverseJoinColumns = @JoinColumn(name = "topping_id") // FK a la otra entidad (Topping)
    )
    private Set<Topping> toppings = new HashSet<>();

    public void addTopping(Topping topping) {
        this.toppings.add(topping);
        topping.getBurgers().add(this);
    }
}

