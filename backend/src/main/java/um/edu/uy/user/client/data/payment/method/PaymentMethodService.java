package um.edu.uy.user.client.data.payment.method;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;

    @PutMapping("/{id}")
    public ResponseEntity<PaymentMethod> updateSmart(@PathVariable Long id, @RequestBody PaymentMethod newInfo) {
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
            return ResponseEntity.ok(paymentMethodRepository.save(newPayment));
        } else {
            // Editar existente (Ej: corregir el nombre del dueño o el alias)
            oldPayment.setCardName(newInfo.getCardName());
            oldPayment.setOwnerName(newInfo.getOwnerName());
            // El número y CVV no se tocan en edición
            return ResponseEntity.ok(paymentMethodRepository.save(oldPayment));
        }
    }
}
