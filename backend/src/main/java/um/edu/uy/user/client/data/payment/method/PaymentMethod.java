package um.edu.uy.user.client.data.payment.method;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.user.User;

@Entity
@Table(name = "Payment_Method")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String cardName;

    @Column(nullable = false)
    private String ownerName;

    @Column(nullable = false, unique = true)
    private String cardNumber; //Recordar encriptar esto excepto los ultimos 4 numeros!!

    @Column(nullable = false)
    private String cvv; //Recordar encriptar esto!!

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder.Default
    @Column(nullable = false)
    private boolean active = true;

}