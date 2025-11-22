package um.edu.uy.user.dto;
import lombok.Data;

@Data
public class UserProfileDto {
    private String email;
    private String name;
    private String surname;
    private String phone;
}