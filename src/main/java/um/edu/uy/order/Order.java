package um.edu.uy.order;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.user.userdata.Address;
import um.edu.uy.user.userdata.PaymentMethod;
import um.edu.uy.user.relations.CreationInOrder;
import um.edu.uy.user.User;

import java.util.Set;
import java.util.HashSet;
import java.time.LocalDateTime;

@Entity
@Table(name = "Order")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "userId") // Asumiendo que id_usuario es el PK de Usuario
    private User client; // La relación "realiza"

    private String state;
    private Double total;
    private LocalDateTime date; // Es bueno guardar la fecha del pedido

    // Relación "se_envia"
    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    // Relación "es_pago"
    @ManyToOne
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod;

    // ¡AQUÍ ESTÁ LA MAGIA!
    // Un Pedido tiene una lista de "líneas de pedido de creación"
    @OneToMany(
            mappedBy = "order", // "pedido" es el nombre del campo en PedidoCreacion
            cascade = CascadeType.ALL, // Si borro un Pedido, se borran sus líneas
            orphanRemoval = true // Si quito una línea de esta lista, se borra de la DB
    )
    private Set<CreationInOrder> itemsCreation = new HashSet<>();

    // Harías lo mismo para las otras líneas de pedido
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<BeverageInOrder> itemsBeverage = new HashSet<>();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SideInOrder> itemsSide = new HashSet<>();

    // --- Constructores, Getters/Setters ---
}
