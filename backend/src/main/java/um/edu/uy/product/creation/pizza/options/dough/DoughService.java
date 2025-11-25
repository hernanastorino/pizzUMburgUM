package um.edu.uy.product.creation.pizza.options.dough;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DoughService {
    private final DoughRepository repository;

    public List<Dough> findAll() { return repository.findAll(); }

    public Dough create(Dough item) {
        if (repository.existsByName(item.getName())) throw new RuntimeException("Dough already exists");
        return repository.save(item);
    }

    public Dough update(Long id, Dough newItem) {
        Dough item = repository.findById(id).orElseThrow(() -> new RuntimeException("Dough not found"));
        item.setName(newItem.getName());
        item.setPrice(newItem.getPrice());
        item.setAvailable(newItem.isAvailable());
        return repository.save(item);
    }

    public void delete(Long id) { repository.deleteById(id); }
}