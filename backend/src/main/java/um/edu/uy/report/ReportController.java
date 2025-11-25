package um.edu.uy.report;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.order.OrderResponse;
import um.edu.uy.order.OrderService;
import um.edu.uy.user.UserService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final OrderService orderService;
    private final UserService userService;

    @GetMapping("/dgi")
    @PreAuthorize("hasAuthority('adminRole')")
    public ResponseEntity<List<OrderResponse>> getSalesTickets(
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        return ResponseEntity.ok(orderService.getSalesForDateRange(from, to));
    }

    @GetMapping("/bps")
    @PreAuthorize("hasAuthority('adminRole')") // Protegemos el endpoint
    public ResponseEntity<Map<String, Long>> getEmployeeCount() {
        long count = userService.countEmployees();
        return ResponseEntity.ok(Map.of("employeeCount", count));
    }
}