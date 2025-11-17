package um.edu.uy.user;

public record UserDTO(
        String email,
        String role,
        String name,
        String surname
) {
}
