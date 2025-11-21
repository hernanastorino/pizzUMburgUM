package um.edu.uy.product.creation.burger;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.product.creation.Topping;
import um.edu.uy.product.creation.burger.options.Bread;
import um.edu.uy.product.creation.burger.options.Condiment;
import um.edu.uy.product.creation.burger.options.Meat;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Burger")
@DiscriminatorValue("BURGER")
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor

public class Burger extends Creation {

    /*@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long burgerId;*/

    private int meatQuantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "condiment_id", referencedColumnName = "condimentId")
    private Condiment condiment; // La relación "lleva_aderezo"

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bread_id", referencedColumnName = "breadId")
    private Bread bread; // La relación "lleva_pan"

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "meat_id", referencedColumnName = "meatId")
    private Meat meat; // La relación "lleva_carne"

    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER)
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

    @Override
    public double getUnitPrice() {
        double total = 0.0;

        if (this.bread != null) {
            total += this.bread.getPrice();
        }

        if (this.meat != null) {
            total += this.meat.getPrice() * this.meatQuantity;
        }

        if (this.condiment != null) {
            total += this.condiment.getPrice();
        }

        if (this.toppings != null && !this.toppings.isEmpty()) {
            total += this.toppings.stream()
                    .mapToDouble(Topping::getPrice)
                    .sum();
        }

        return total;
    }
}

