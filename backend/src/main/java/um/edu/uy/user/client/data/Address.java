package um.edu.uy.user.client.data;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.user.User;

@Entity
@Table(name = "Adress") // Usa el nombre de la tabla de tu MER (MER 4)
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    private String name;
    private String street;
    private String indications;
    private String doorNumber;
    private String aptNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

}