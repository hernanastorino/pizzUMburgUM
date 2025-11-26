package um.edu.uy.user.dto;

public record UserDTO(
        Long userId,
        String email,
        String role,
        String name,
        String surname
) {
}
