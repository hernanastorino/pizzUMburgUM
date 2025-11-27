package um.edu.uy.product.side.relations;

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
public class SideInOrderKey implements Serializable {

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "side_id")
    private Long sideId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SideInOrderKey that = (SideInOrderKey) o;
        return Objects.equals(orderId, that.orderId) &&
                Objects.equals(sideId, that.sideId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, sideId);
    }
}