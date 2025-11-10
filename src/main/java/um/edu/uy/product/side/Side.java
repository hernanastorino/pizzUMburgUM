package um.edu.uy.product.side;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.Creation;


@Entity
@Table(name = "Side")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Side {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sideId;

    @Column(nullable = false)
    private String name;

    private Double price;

    @ManyToOne
    @JoinColumn(name = "creation_id")
    private Creation creation;

}
/*
falta:
autenticacion integrada con web (redireccionamiento)
JSON WEB TOKENNNNNNN (LA PARCA)


 */
