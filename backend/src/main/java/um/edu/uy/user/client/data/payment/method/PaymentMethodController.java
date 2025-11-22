package um.edu.uy.user.client.data.payment.method;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class PaymentMethodController {

    @Autowired private PaymentMethodRepository paymentMethodRepository;
    @Autowired private UserRepository userRepository;

    // obtener direcciones de un usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentMethod>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(paymentMethodRepository.findByUser_UserId(userId));
    }

    // crear nueva dir
    @PostMapping("/user/{userId}")
    public ResponseEntity<PaymentMethod> create(@PathVariable Long userId, @RequestBody PaymentMethod pmethod) {
        User user = userRepository.findById(userId).orElseThrow();
        pmethod.setUser(user);
        return ResponseEntity.ok(paymentMethodRepository.save(pmethod));
    }

    // editar dir existente
    @PutMapping("/{id}")
    public ResponseEntity<PaymentMethod> update(@PathVariable Long id, @RequestBody PaymentMethod newPm) {
        return paymentMethodRepository.findById(id).map(pmethod -> {
            pmethod.setCardName(newPm.getCardName());
            return ResponseEntity.ok(paymentMethodRepository.save(pmethod));
        }).orElse(ResponseEntity.notFound().build());
    }

    // borrar dir
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        paymentMethodRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}