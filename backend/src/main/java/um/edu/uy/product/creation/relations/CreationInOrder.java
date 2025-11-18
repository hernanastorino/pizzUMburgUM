package um.edu.uy.product.creation.relations;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.order.Order;

@Entity
@Table(name = "Creation_In_Order")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreationInOrder {

    @EmbeddedId
    private CreationInOrderKey id;

    // Define la relación con Pedido
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("orderId") //
    @JoinColumn(name = "order_id")
    private Order order;

    // Define la relación con Creacion
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("creationId") //
    @JoinColumn(name = "creation_id")
    private Creation creation;

    @Column(name = "creation_quantity", nullable = false)
    private int creationQuantity;

}
