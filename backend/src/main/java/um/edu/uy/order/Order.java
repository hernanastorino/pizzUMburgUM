package um.edu.uy.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.beverage.relations.BeverageInOrder;
import um.edu.uy.product.side.relations.SideInOrder;
import um.edu.uy.user.client.data.adress.Address;
import um.edu.uy.user.client.data.payment.method.PaymentMethod;
import um.edu.uy.product.creation.relations.CreationInOrder;
import um.edu.uy.user.User;

import java.util.Set;
import java.util.HashSet;
import java.time.LocalDateTime;

@Entity
@Table(name = "App_Order")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User client; // La relación "realiza"

    @Enumerated(EnumType.STRING)
    private OrderStatus state;

    @Column(nullable = false)
    private Double total;

    @Column(nullable = false)
    private LocalDateTime date; // Es bueno guardar la fecha del pedido

    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address; // Relación "se_envia"

    @ManyToOne
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod; // Relación "es_pago"

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnore
    private Set<CreationInOrder> itemsCreation = new HashSet<>();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<BeverageInOrder> itemsBeverage = new HashSet<>();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SideInOrder> itemsSide = new HashSet<>();

}