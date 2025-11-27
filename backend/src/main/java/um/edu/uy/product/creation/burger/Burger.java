package um.edu.uy.product.creation.burger;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.product.creation.topping.Topping;
import um.edu.uy.product.creation.burger.options.bread.Bread;
import um.edu.uy.product.creation.burger.options.condiment.Condiment;
import um.edu.uy.product.creation.burger.options.meat.Meat;

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

@PrimaryKeyJoinColumn(name = "creationId")
public class Burger extends Creation {

    private int meatQuantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "condiment_id", referencedColumnName = "condimentId")
    private Condiment condiment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bread_id", referencedColumnName = "breadId")
    private Bread bread;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "meat_id", referencedColumnName = "meatId")
    private Meat meat;

    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "Burger_Topping",
            joinColumns = @JoinColumn(name = "creation_id", referencedColumnName = "creationId"),
            inverseJoinColumns = @JoinColumn(name = "topping_id")
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
            if (this.meatQuantity == 3) total += this.bread.getPriceLarge();
            else if (this.meatQuantity == 2) total += this.bread.getPriceMedium();
            else total += this.bread.getPriceSmall();
        }

        if (this.meat != null) {
            if (this.meatQuantity == 3) total += this.meat.getPriceLarge();
            else if (this.meatQuantity == 2) total += this.meat.getPriceMedium();
            else total += this.meat.getPriceSmall();
        }

        if (this.condiment != null) {
            if (this.meatQuantity == 3) total += this.condiment.getPriceLarge();
            else if (this.meatQuantity == 2) total += this.condiment.getPriceMedium();
            else total += this.condiment.getPriceSmall();
        }

        if (this.toppings != null && !this.toppings.isEmpty()) {
            for (Topping t : this.toppings) {
                if (this.meatQuantity == 3) total += t.getPriceLarge();
                else if (this.meatQuantity == 2) total += t.getPriceMedium();
                else total += t.getPriceSmall();
            }
        }

        return total;
    }
}

