package um.edu.uy.dto;

// record is inmutable y sirve exactamente para el DTO
public record RegisterRequestDTO(String email, String password) {
}
