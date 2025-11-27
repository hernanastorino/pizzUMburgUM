package um.edu.uy.product.creation.relations;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("orderId") //
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("creationId") //
    @JoinColumn(name = "creation_id")
    private Creation creation;

    @Column(name = "creation_quantity", nullable = false)
    private Integer CreationQuantity;

    @Column(name = "creation_subtotal", nullable = false)
    private Double creationSubtotal;

    @PrePersist
    public void calculateSubtotal() {
        if (creation != null && creationSubtotal != null) {
            this.creationSubtotal = creation.getUnitPrice() * this.CreationQuantity;
        }
    }
}
