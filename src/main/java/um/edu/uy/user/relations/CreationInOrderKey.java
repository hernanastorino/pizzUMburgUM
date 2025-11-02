package um.edu.uy.user.relations;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable // Indica a JPA que esta clase se "incrustará" en otra entidad
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

    // --- Constructores, Getters/Setters ---
    // (Omitidos por brevedad)

    // ¡MUY IMPORTANTE! JPA necesita equals() y hashCode()
    // para gestionar claves compuestas.
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