package um.edu.uy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import um.edu.uy.product.creation.burger.options.Bread; // Cambiar import según corresponda

@Repository
public interface BreadRepository extends JpaRepository<Bread, Long> {
    boolean existsByName(String name);
}