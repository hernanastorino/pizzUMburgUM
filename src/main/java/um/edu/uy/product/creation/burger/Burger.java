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
/*
@Entity
@Table(name = "hamburguesa")
@DiscriminatorValue("HAMBURGUESA") // Valor que se guarda en la columna "tipo_creacion"
public class Hamburguesa extends Creacion {

    private int cantCarnes;

    // Aquí van las relaciones @ManyToOne a TipoCarne, TipoPan
    // y @ManyToMany a Aderezo, Topping
}
