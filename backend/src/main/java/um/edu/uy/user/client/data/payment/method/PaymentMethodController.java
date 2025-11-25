package um.edu.uy.user.client.data.payment.method;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.user.UserRepository;
import um.edu.uy.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentMethodController {

    private final PaymentMethodService paymentMethodService;

    // 1. GET
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentMethod>> getPaymentMethodByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(paymentMethodService.getActivePaymentMethodsByUser(userId));
    }

    // 2. POST
    @PostMapping("/user/{userId}")
    public ResponseEntity<PaymentMethod> createPaymentMethod(
            @PathVariable Long userId,
            @RequestBody PaymentMethod newPayment
    ) {
        PaymentMethod created = paymentMethodService.createPaymentMethodForUser(userId, newPayment);
        return ResponseEntity.ok(created);
    }

    // 3. PUT
    @PutMapping("/{id}")
    public ResponseEntity<PaymentMethod> updatePaymentMethod(@PathVariable Long id, @RequestBody PaymentMethod newInfo) {
        PaymentMethod updated = paymentMethodService.updateSmart(id, newInfo);
        return ResponseEntity.ok(updated);
    }

    // 4. DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePaymentMethodById(@PathVariable Long id) {
        paymentMethodService.softDelete(id);
        return ResponseEntity.ok().build();
    }
}