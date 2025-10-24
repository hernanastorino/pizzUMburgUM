package um.edu.uy.entities;

import jakarta.persistence.*;
import lombok.*;

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
    @Column(name = "SideId")
    private long id;

    @Column(name = "SideName")
    private String name;

    @Column(name = "SidePrice")
    private int price;
}
