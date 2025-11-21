package um.edu.uy.product.beverage.relations;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BeverageInOrderKey implements Serializable {

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "beverage_id")
    private Long beverageId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BeverageInOrderKey that = (BeverageInOrderKey) o;
        return Objects.equals(orderId, that.orderId) &&
                Objects.equals(beverageId, that.beverageId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, beverageId);
    }
}