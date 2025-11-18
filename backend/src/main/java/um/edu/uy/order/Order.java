package um.edu.uy.order;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.beverage.relations.BeverageInOrder;
import um.edu.uy.product.beverage.relations.BeverageInOrderKey;
import um.edu.uy.product.creation.relations.CreationInOrderKey;
import um.edu.uy.product.side.Side;
import um.edu.uy.product.side.relations.SideInOrder;
import um.edu.uy.product.side.relations.SideInOrderKey;
import um.edu.uy.user.client.data.Address;
import um.edu.uy.user.client.data.PaymentMethod;
import um.edu.uy.product.creation.relations.CreationInOrder;
import um.edu.uy.user.User;

import java.util.Set;
import java.util.HashSet;
import java.time.LocalDateTime;

@Entity
@Table(name = "Order")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User client; // La relación "realiza"

    private String state;

    private Double total;
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address; // Relación "se_envia"

    @ManyToOne
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod; // Relación "es_pago"

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<CreationInOrder> itemsCreation = new HashSet<>();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<BeverageInOrder> itemsBeverage = new HashSet<>();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SideInOrder> itemsSide = new HashSet<>();


    //Agrega una Pizza o Hamburguesa al pedido
    public void addCreation(um.edu.uy.product.creation.Creation creation, int quantity) {
        CreationInOrder item = new CreationInOrder();

        // Se incializa la key e hibernate llena los IDs por @MapsId
        item.setId(new CreationInOrderKey());

        item.setOrder(this);
        item.setCreation(creation);
        item.setCreationQuantity(quantity);

        this.itemsCreation.add(item);
    }

    // Agrega una Bebida al pedido
    public void addBeverage(um.edu.uy.product.beverage.Beverage beverage, int quantity) {
        BeverageInOrder item = new BeverageInOrder();

        item.setId(new BeverageInOrderKey());

        item.setOrder(this);
        item.setBeverage(beverage);
        item.setBeverageQuantity(quantity);

        this.itemsBeverage.add(item);
    }

    // Agrega un Acompañamiento al pedido
    public void addSide(um.edu.uy.product.side.Side side, int quantity) {
        SideInOrder item = new SideInOrder();

        item.setId(new SideInOrderKey());

        item.setOrder(this);
        item.setSide(side);
        item.setSideQuantity(quantity);

        this.itemsSide.add(item);
    }

}
