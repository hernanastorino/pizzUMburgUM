package um.edu.uy.user.dto;

public record UserDTO(
        String email,
        String role,
        String name,
        String surname
) {
}
