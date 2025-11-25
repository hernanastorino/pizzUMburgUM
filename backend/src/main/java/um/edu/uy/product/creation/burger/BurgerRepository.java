package um.edu.uy.product.creation.burger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BurgerRepository extends JpaRepository<Burger, Long> {
    // Encontrar una burger en el pedido actual

}