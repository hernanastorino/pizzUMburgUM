package um.edu.uy.product.beverage.relations;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("beverageId")
    @JoinColumn(name = "beverage_id")
    private Beverage beverage;

    @Column(name = "beverage_quantity", nullable = false)
    private Integer beverageQuantity;

    @Column(name = "beverage_subtotal", nullable = false)
    private Double beverageSubtotal;

    @PrePersist
    public void calculateSubtotal() {
        if (beverage != null && beverageQuantity != null) {
            this.beverageSubtotal = beverage.getPrice() * beverageQuantity;
        }
    }
}