package um.edu.uy.product.creation.pizza;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.product.creation.topping.Topping;
import um.edu.uy.product.creation.pizza.options.cheese.Cheese;
import um.edu.uy.product.creation.pizza.options.dough.Dough;
import um.edu.uy.product.creation.pizza.options.sauce.Sauce;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Pizza")
@DiscriminatorValue("PIZZA")
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "creationId")
public class Pizza extends Creation {


    private String size;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dough_id", referencedColumnName = "doughId")
    private Dough dough;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cheese_type_id", referencedColumnName = "cheeseId")
    private Cheese cheese;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sauce_type_id", referencedColumnName = "sauceId")
    private Sauce sauce;

    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "Pizza_Topping",
            joinColumns = @JoinColumn(name = "creation_id", referencedColumnName = "creationId"),
            inverseJoinColumns = @JoinColumn(name = "topping_id")
    )
    private Set<Topping> toppings = new HashSet<>();

    public void addTopping(Topping topping) {
        this.toppings.add(topping);
        topping.getPizzas().add(this);
    }

    @Override
    public double getUnitPrice() {
        double total = 0.0;

        int sizeTier = 1;
        if ("20cm".equals(this.size)) sizeTier = 2;
        if ("25cm".equals(this.size)) sizeTier = 3;

        if (this.dough != null) {
            if (sizeTier == 3) total += this.dough.getPriceLarge();
            else if (sizeTier == 2) total += this.dough.getPriceMedium();
            else total += this.dough.getPriceSmall();
        }

        if (this.cheese != null) {
            if (sizeTier == 3) total += this.cheese.getPriceLarge();
            else if (sizeTier == 2) total += this.cheese.getPriceMedium();
            else total += this.cheese.getPriceSmall();
        }

        if (this.sauce != null) {
            if (sizeTier == 3) total += this.sauce.getPriceLarge();
            else if (sizeTier == 2) total += this.sauce.getPriceMedium();
            else total += this.sauce.getPriceSmall();
        }

        if (this.toppings != null && !this.toppings.isEmpty()) {
            for (Topping t : this.toppings) {
                if (sizeTier == 3) total += t.getPriceLarge();
                else if (sizeTier == 2) total += t.getPriceMedium();
                else total += t.getPriceSmall();
            }
        }

        return total;
    }
}