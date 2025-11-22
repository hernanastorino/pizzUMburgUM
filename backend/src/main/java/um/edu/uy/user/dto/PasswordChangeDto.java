package um.edu.uy.user.dto;
import lombok.Data;

@Data
public class PasswordChangeDto {
    private String currentPassword;
    private String newPassword;
}
