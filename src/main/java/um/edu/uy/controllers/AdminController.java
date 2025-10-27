package um.edu.uy.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    // Only users with 'ROLE_ADMIN' can access this
    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String getAdminDashboard() {
        return "Welcome, Admin!";
    }

}
