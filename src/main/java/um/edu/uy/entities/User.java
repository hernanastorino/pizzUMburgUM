package um.edu.uy.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "app_user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String email;

    private String username;

    private String password;

    private String name;

    private String surname;


    @Enumerated(EnumType.STRING)
    private Role role;


}
