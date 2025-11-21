package um.edu.uy.product.creation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import um.edu.uy.product.creation.Creation;

import java.util.List;

@Repository
public interface CreationRepository extends JpaRepository<Creation, Long> {
    List<Creation> findByUser_UserId(Long userId);
}