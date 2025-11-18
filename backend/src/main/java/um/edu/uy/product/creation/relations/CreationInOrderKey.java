package um.edu.uy.product.creation.relations;

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
public class CreationInOrderKey implements Serializable {

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "creation_id")
    private Long creationId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CreationInOrderKey that = (CreationInOrderKey) o;
        return Objects.equals(orderId, that.orderId) &&
                Objects.equals(creationId, that.creationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, creationId);
    }
}