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

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDTO> getMyProfile(Authentication authentication) {
        UserDTO user = userService.findUserByEmail(authentication.getName());
        return ResponseEntity.ok(user);
    }

    /**
     * Endpoint for an Admin to create another Admin.
     * FIXED: Changed hasRole('ADMIN') to hasAuthority('adminRole')
     */
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
}