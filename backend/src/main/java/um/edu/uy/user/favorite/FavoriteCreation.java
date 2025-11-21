package um.edu.uy.user.favorite;

import jakarta.persistence.*;
import lombok.*;
import um.edu.uy.product.creation.Creation;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "favorite_creation",
    uniqueConstraints = {
            @UniqueConstraint(columnNames = {"user_id", "creation_id"})
    },
    indexes = {
            @Index(name = "idx_fav_user", columnList = "user:id"),
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "creation_id", nullable = false)
    private Creation creation;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}