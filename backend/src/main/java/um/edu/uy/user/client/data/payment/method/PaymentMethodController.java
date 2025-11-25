package um.edu.uy.user.client.data.payment.method;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.user.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentMethodController {

    @Autowired private PaymentMethodRepository paymentMethodRepository;
    @Autowired private UserRepository userRepository;

    // 1. GET
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentMethod>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(paymentMethodRepository.findByUser_UserIdAndActiveTrue(userId));
    }

    // 2. DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        PaymentMethod pm = paymentMethodRepository.findById(id).orElseThrow();
        pm.setActive(false);
        paymentMethodRepository.save(pm);
        return ResponseEntity.ok().build();
    }

    // 3. PUT
    @PutMapping("/{id}")
    public ResponseEntity<PaymentMethod> updateSmart(@PathVariable Long id, @RequestBody PaymentMethod newInfo) {
        PaymentMethod oldPayment = paymentMethodRepository.findById(id).orElseThrow();

        // Si cambia el número, es otra tarjeta
        boolean coreChanges = !oldPayment.getCardNumber().equals(newInfo.getCardNumber());

        if (coreChanges) {
            // Apagar vieja
            oldPayment.setActive(false);
            paymentMethodRepository.save(oldPayment);

            // Crear nueva
            PaymentMethod newPayment = PaymentMethod.builder()
                    .user(oldPayment.getUser())
                    .active(true)
                    .cardName(newInfo.getCardName())
                    .cardNumber(newInfo.getCardNumber())
                    .cvv(newInfo.getCvv())
                    .ownerName(newInfo.getOwnerName())
                    .build();
            return ResponseEntity.ok(paymentMethodRepository.save(newPayment));
        } else {
            // Editar existente
            oldPayment.setCardName(newInfo.getCardName()); // Ej: "Mi Visa" -> "Visa Débito"
            return ResponseEntity.ok(paymentMethodRepository.save(oldPayment));
        }
    }
}