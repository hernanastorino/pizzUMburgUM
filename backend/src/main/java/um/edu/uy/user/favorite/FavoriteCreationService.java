package um.edu.uy.user.favorite;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.product.creation.CreationRepository;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;
import um.edu.uy.user.favorite.dto.FavoriteResponse;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteCreationService {

    private final FavoriteCreationRepository favoriteCreationRepo;
    private final UserRepository userRepo;
    private final CreationRepository creationRepo;

    @Transactional
    public FavoriteResponse addFavorite(Long userId, Long creationId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        Creation creation = creationRepo.findById(creationId)
                .orElseThrow(() -> new RuntimeException("Creation not found: " + creationId));

        // Si ya existe, lo devolvemos sin duplicar
        if (favoriteCreationRepo.existsByUserUserIdAndCreationCreationId(userId, creationId)) {
            FavoriteCreation existing = favoriteCreationRepo.findByUserUserIdAndCreationCreationId(userId, creationId)
                    .orElseThrow(() -> new RuntimeException("Favorite creation not found"));
            return map(existing);
        }

        FavoriteCreation fav = FavoriteCreation.builder()
                .user(user)
                .creation(creation)
                .createdOn(LocalDateTime.now())
                .build();

        FavoriteCreation saved = favoriteCreationRepo.save(fav);

        return map(saved);
    }

    @Transactional
    public void removeFavorite(Long userId, Long creationId) {
        // Borramos por creationId que es lo que manda el frontend generalmente
        // OJO: Si prefieres borrar por favoriteId, cambia la firma del método y del repo.
        if (!favoriteCreationRepo.existsByUserUserIdAndCreationCreationId(userId, creationId)) {
            throw new RuntimeException("Favorite not found");
        }

        favoriteCreationRepo.deleteByUserUserIdAndCreationCreationId(userId, creationId);
    }

    public List<FavoriteResponse> listFavorites(Long userId) {
        userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        List<FavoriteCreation> list = favoriteCreationRepo.findAllByUserUserId(userId);

        return list.stream().map(this::map).toList();
    }

    private FavoriteResponse map(FavoriteCreation f) {
        return new FavoriteResponse(f);
    }
}