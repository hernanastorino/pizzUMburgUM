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

    @EmbeddedId // 1. Usa la clave compuesta que acabamos de definir
    private SideInOrderKey id;

    // 2. Define la relación con Pedido
    @ManyToOne(fetch = FetchType.EAGER) // LAZY es mejor para performance
    @MapsId("orderId") // 3. Mapea la parte "pedidoId" de nuestra EmbeddedId...
    @JoinColumn(name = "order_id") // a esta relación/columna.
    private Order order;  //debe coincidir en ORDER con el mappedBy

    // 4. Define la relación con bebida
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("sideId") // 5. Mapea la parte "beverageId" de nuestra EmbeddedId...
    @JoinColumn(name = "side_id") // ...a esta relación/columna.
    private Side side;

    // 6. ¡El atributo extra!
    @Column(name = "side_quantity", nullable = false)
    private int sideQuantity;

}
