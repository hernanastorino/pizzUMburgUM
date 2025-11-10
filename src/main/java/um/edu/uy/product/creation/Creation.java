package um.edu.uy.product.creation;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import um.edu.uy.user.User;
import um.edu.uy.product.creation.relations.CreationInOrder;

import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "Creation")
@Inheritance(strategy = InheritanceType.JOINED) // Estrategia de herencia: una tabla por clase
@DiscriminatorColumn(name = "CREATION_TYPE") // Columna que dice si es "PIZZA" o "HAMBURGUESA"
@Getter
@Setter
@SuperBuilder //esto es para que el builder tenga en cuenta la herencia
@AllArgsConstructor
@NoArgsConstructor
public abstract class Creation { // Abstracta, porque una creación SIEMPRE es Pizza o Hamburguesa

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long creationId;

    @Column(nullable = false)
    private String name;

    private Double subtotal;
    private boolean isFavorite;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id") // La relación "crea"
    private User user;

    // Relación inversa a PedidoCreacion
    // Una Creación puede estar en muchas "líneas de pedido"
    @OneToMany(
            mappedBy = "creation", // "creacion" es el nombre del campo en PedidoCreacion
            cascade = CascadeType.ALL, // Generalmente no queremos borrar una creación si se borra un pedido
            orphanRemoval = false
    )
    private Set<CreationInOrder> itemsPedido = new HashSet<>();

}
