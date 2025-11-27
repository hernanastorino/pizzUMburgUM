package um.edu.uy.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.security.dto.RegisterRequest;
import um.edu.uy.user.dto.PasswordChangeDto;
import um.edu.uy.user.dto.UserDTO;
import um.edu.uy.user.dto.UserProfileDto;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{email:.+}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        UserDTO user = userService.findUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDTO> getMyProfile(Authentication authentication) {
        UserDTO user = userService.findUserByEmail(authentication.getName());
        return ResponseEntity.ok(user);
    }

    @PostMapping("/admin")
    @PreAuthorize("hasAuthority('adminRole')")
    public ResponseEntity<?> createAdmin(@RequestBody RegisterRequest request) {
        try {
            UserDTO newAdmin = userService.createAdminUser(request);
            return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<User> updateProfile(@PathVariable Long id, @RequestBody UserProfileDto dto) {
        return ResponseEntity.ok(userService.updateUserProfile(id, dto));
    }

    @PostMapping("/{id}/password")
    public ResponseEntity<?> changePassword(@PathVariable Long id, @RequestBody PasswordChangeDto dto) {
        userService.changePassword(id, dto);
        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }
}