package um.edu.uy.product.creation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import um.edu.uy.user.User;
import um.edu.uy.product.creation.relations.CreationInOrder;

import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "Creation")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "CREATION_TYPE")
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class Creation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long creationId;

    @Column(nullable = false)
    private String name;

    private Double subtotal;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;


    @OneToMany(
            mappedBy = "creation",
            cascade = CascadeType.ALL,
            orphanRemoval = false
    )
    @JsonIgnore
    private Set<CreationInOrder> itemsPedido = new HashSet<>();

    private boolean isAvailable;

    public double calculateSubtotal() {
        double price = getUnitPrice();
        this.subtotal = price;
        return price;
    }

    public abstract double getUnitPrice();
}
