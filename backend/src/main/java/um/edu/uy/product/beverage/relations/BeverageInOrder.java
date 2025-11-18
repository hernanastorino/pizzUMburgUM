package um.edu.uy.product.beverage.relations;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.order.Order;
import um.edu.uy.product.beverage.Beverage;
import um.edu.uy.product.creation.Creation;

@Entity
@Table(name = "Beverage_In_Order")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BeverageInOrder {

    @EmbeddedId
    private BeverageInOrderKey id;

    // Define la relación con Pedido
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;

    // Define la relación con bebida
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("beverageId")
    @JoinColumn(name = "beverage_id")
    private Beverage beverage;

    @Column(name = "beverage_quantity", nullable = false)
    private int beverageQuantity;

}
