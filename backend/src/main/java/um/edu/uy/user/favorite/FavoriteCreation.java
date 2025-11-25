package um.edu.uy.user.favorite;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.user.User;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "favorite_creation",
    uniqueConstraints = {
            @UniqueConstraint(columnNames = {"user_id", "creation_id"})
    },
    indexes = {
            @Index(name = "idx_fav_user", columnList = "user_id"),
            @Index(name = "idx_fav_creation", columnList = "creation_id")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteCreation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "creation_id", nullable = false)
    private Creation creation;

    @Column(name = "created_on", nullable = false)
    private LocalDateTime createdOn;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    public void prePersist() {
        if (createdOn == null) {
            createdOn = LocalDateTime.now();
        }
    }
}