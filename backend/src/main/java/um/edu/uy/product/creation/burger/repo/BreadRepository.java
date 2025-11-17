package um.edu.uy.product.creation.burger.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import um.edu.uy.product.creation.burger.options.Bread;

@Repository
public interface BreadRepository extends JpaRepository<Bread, Long> {
}
