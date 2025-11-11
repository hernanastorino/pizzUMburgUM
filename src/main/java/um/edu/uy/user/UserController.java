package um.edu.uy.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.security.dto.RegisterRequest;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * An endpoint for any authenticated user to get their *own* profile information.
     * It uses the 'Authentication' principal object injected by Spring Security.
     */
    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()") // Any logged-in user can access this
    public ResponseEntity<UserDTO> getMyProfile(Authentication authentication) {
        // 'authentication.getName()' will return the username (which is the email)
        UserDTO user = userService.findUserByEmail(authentication.getName());
        return ResponseEntity.ok(user);
    }

    /**
     * An endpoint for an Admin to create another Admin user.
     * This fulfills the requirement.
     */
    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')") // Only Admins can access this
    public ResponseEntity<?> createAdmin(@RequestBody RegisterRequest request) {
        try {
            UserDTO newAdmin = userService.createAdminUser(request);
            return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}