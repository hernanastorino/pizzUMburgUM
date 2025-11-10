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

    @EmbeddedId // 1. Usa la clave compuesta que acabamos de definir
    private CreationInOrderKey id;

    // 2. Define la relación con Pedido
    @ManyToOne(fetch = FetchType.LAZY) // LAZY es mejor para performance
    @MapsId("orderId") // 3. Mapea la parte "pedidoId" de nuestra EmbeddedId...
    @JoinColumn(name = "order_id") // a esta relación/columna.
    private Order order;  //debe coincidir en ORDER con el mappedBy

    // 4. Define la relación con Creacion
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("creationId") // 5. Mapea la parte "creacionId" de nuestra EmbeddedId...
    @JoinColumn(name = "creation_id") // ...a esta relación/columna.
    private Creation creation;

    // 6. ¡El atributo extra!
    @Column(name = "creation_quantity", nullable = false)
    private Integer creationQuantity;

    @Column(name = "creation_subtotal", nullable = false)
    private Double creationSubtotal;

    @PrePersist
    public void calculateSubtotal() {
        if (creation != null && creationQuantity != null) {
            this.creationSubtotal = creation.getPrice() * creationQuantity;
        }
    }
}
