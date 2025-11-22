package um.edu.uy.product.side;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SideRepository extends JpaRepository<Side, Long> {
    boolean existsByName(String name);
    Optional<Side> findByName(String name);
}