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

    @EmbeddedId // 1. Usa la clave compuesta que acabamos de definir
    private BeverageInOrderKey id;

    // 2. Define la relación con Pedido
    @ManyToOne(fetch = FetchType.EAGER) // EAGER es mejor para performance
    @MapsId("orderId") // 3. Mapea la parte "pedidoId" de nuestra EmbeddedId...
    @JoinColumn(name = "order_id") // a esta relación/columna.
    private Order order;  //debe coincidir en ORDER con el mappedBy

    // 4. Define la relación con bebida
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("beverageId") // 5. Mapea la parte "beverageId" de nuestra EmbeddedId...
    @JoinColumn(name = "beverage_id") // ...a esta relación/columna.
    private Beverage beverage;

    // 6. ¡El atributo extra!
    @Column(name = "beverage_quantity", nullable = false)
    private int beverageQuantity;

}
