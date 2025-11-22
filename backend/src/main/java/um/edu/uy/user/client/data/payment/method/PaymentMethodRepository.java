package um.edu.uy.user.client.data.payment.method;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import um.edu.uy.user.User;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
    List<PaymentMethod> findByUser(User user);

    List<PaymentMethod> findByUser_UserId(Long userId);
}