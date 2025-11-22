package um.edu.uy.product.side.relations;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.order.Order;
import um.edu.uy.product.side.Side;

@Entity
@Table(name = "Side_In_Order")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SideInOrder {

    @EmbeddedId
    private SideInOrderKey id;

    // Define la relación con Pedido
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;

    // Define la relación con bebida
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("sideId")
    @JoinColumn(name = "side_id")
    private Side side;

    @Column(name = "side_quantity", nullable = false)
    private int sideQuantity;

}
