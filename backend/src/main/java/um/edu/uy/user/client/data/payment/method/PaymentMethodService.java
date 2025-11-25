package um.edu.uy.user.client.data.payment.method;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;
    private final UserRepository userRepository;

    public List<PaymentMethod> getActivePaymentMethodsByUser(Long userId) {
        return paymentMethodRepository.findByUser_UserIdAndActiveTrue(userId);
    }

    public PaymentMethod createPaymentMethodForUser(Long userId, PaymentMethod newPayment) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PaymentMethod payment = PaymentMethod.builder()
                .user(user)
                .cardName(newPayment.getCardName())
                .ownerName(newPayment.getOwnerName())
                .cardNumber(newPayment.getCardNumber())
                .cvv(newPayment.getCvv())
                .active(true)
                .build();

        return paymentMethodRepository.save(payment);
    }

    @PutMapping("/{id}")
    public PaymentMethod updateSmart(@PathVariable Long id, @RequestBody PaymentMethod newInfo) {
        PaymentMethod oldPayment = paymentMethodRepository.findById(id).orElseThrow();

        // Si cambia el número de tarjeta, ES OTRA TARJETA.
        boolean coreChanges = !oldPayment.getCardNumber().equals(newInfo.getCardNumber());

        if (coreChanges) {
            // Crear nueva
            PaymentMethod newPayment = PaymentMethod.builder()
                    .user(oldPayment.getUser())
                    .cardName(newInfo.getCardName())
                    .cardNumber(newInfo.getCardNumber())
                    .cvv(newInfo.getCvv())
                    .ownerName(newInfo.getOwnerName())
                    .build();
            return paymentMethodRepository.save(newPayment);
        } else {
            // Editar existente (Ej: corregir el nombre del dueño o el alias)
            oldPayment.setCardName(newInfo.getCardName());
            oldPayment.setOwnerName(newInfo.getOwnerName());
            // El número y CVV no se tocan en edición
            return paymentMethodRepository.save(oldPayment);
        }
    }

    public void softDelete(Long id) {
        PaymentMethod pm = paymentMethodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment method not found"));

        pm.setActive(false);
        paymentMethodRepository.save(pm);
    }

    public PaymentMethod findById(Long id) {
        return paymentMethodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment method not found"));
    }
}
