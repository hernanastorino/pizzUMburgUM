package um.edu.uy.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "OrderRelation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class OrderRelation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "Creation_ID", nullable = false)
    private Creation creation;

    @ManyToOne
    @JoinColumn(name = "Side_ID", nullable = false)
}