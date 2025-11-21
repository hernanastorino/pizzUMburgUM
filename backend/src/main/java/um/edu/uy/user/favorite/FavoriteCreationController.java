package um.edu.uy.user.favorite;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.user.favorite.dto.FavoriteResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users/{userId}/favorites")
public class FavoriteCreationController {

    private final FavoriteCreationService favoriteCreationService;

    @PostMapping("/{creationId}")
    public ResponseEntity<FavoriteResponse> addFavorite(@PathVariable Long userId, @PathVariable Long creationId) {
        FavoriteResponse favResponse = favoriteCreationService.addFavorite(userId, creationId);
        return ResponseEntity.ok(favResponse);
    }

    @DeleteMapping("/{creationId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long userId, @PathVariable Long creationId) {
        favoriteCreationService.removeFavorite(userId, creationId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<FavoriteResponse>> listFavorites(@PathVariable Long userId) {
        List<FavoriteResponse> list = favoriteCreationService.listFavorites(userId);
        return ResponseEntity.ok(list);
    }
}
