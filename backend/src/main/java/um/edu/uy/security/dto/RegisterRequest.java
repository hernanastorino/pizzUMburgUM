package um.edu.uy.security.dto;

public record RegisterRequest(
        String email,
        String password,
        String name,
        String surname
) {
}