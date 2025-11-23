package um.edu.uy.user.favorite.dto;

import java.time.LocalDateTime;

public record FavoriteResponse(
        Long creationId,
        String creationName,
        Double creationSubtotal,
        LocalDateTime favoritedOn
) {}