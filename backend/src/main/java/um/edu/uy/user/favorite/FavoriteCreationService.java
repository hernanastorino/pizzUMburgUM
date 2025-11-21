package um.edu.uy.user.favorite;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import um.edu.uy.product.creation.Creation;
import um.edu.uy.product.creation.CreationRepository;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;
import um.edu.uy.user.favorite.dto.FavoriteResponse;

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

        if (user.getRole() != null && !"clientRole".equals(user.getRole().name())) {
            throw new RuntimeException("Only clients can add favorites");
        }

        Creation creation = creationRepo.findById(creationId)
                .orElseThrow(() -> new RuntimeException("Creation not found: " + creationId));

        boolean exists = favoriteCreationRepo.existsByUserUserIdAndCreationCreationId(userId, creationId);
        if (exists) {
            FavoriteCreation existing = favoriteCreationRepo.findByUserUserIdAndCreationCreationId(userId, creationId)
                    .orElseThrow();
            return mapToResponse(existing);
        }

        FavoriteCreation fav = FavoriteCreation.builder()
                .user(user)
                .creation(creation)
                .build();

        FavoriteCreation saved = favoriteCreationRepo.save(fav);

        if (user.getFavoriteCreations() != null) {
            user.getFavoriteCreations().add(saved.getCreation());
        }

        return mapToResponse(saved);
    }

    @Transactional
    public void removeFavorite(Long userId, Long creationId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        if (user.getRole() != null && !"clientRole".equals(user.getRole().name())) {
            throw new RuntimeException("Only clients can remove favorites");
        }

        if (!favoriteCreationRepo.existsByUserUserIdAndCreationCreationId(userId, creationId)) {
            throw new RuntimeException("Favorite not found");
        }

        favoriteCreationRepo.deleteByUserUserIdAndCreationCreationId(userId, creationId);
    }

    @Transactional(readOnly = true)
    public List<FavoriteResponse> listFavorites(Long userId) {
        userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        List<FavoriteCreation> list = favoriteCreationRepo.findAllByUserUserId(userId);

        return list.stream().map(this::mapToResponse).toList();
    }

    private FavoriteResponse mapToResponse(FavoriteCreation f) {
        return new FavoriteResponse(
                f.getCreation().getCreationId(),
                f.getCreation().getName(),
                f.getCreation().getSubtotal(),
                f.getCreatedAt()
        );
    }
}