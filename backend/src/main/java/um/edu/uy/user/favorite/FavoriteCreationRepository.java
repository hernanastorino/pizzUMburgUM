package um.edu.uy.user.favorite;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteCreationRepository extends JpaRepository<FavoriteCreation, Long> {

    List<FavoriteCreation> findAllByUserUserId(Long userId);

    boolean existsByUserUserIdAndCreationCreationId(Long userId, Long creationId);

    Optional<FavoriteCreation> findByUserUserIdAndCreationCreationId(Long userId, Long creationId);

    void deleteByUserUserIdAndCreationCreationId(Long userId, Long creationId);
}