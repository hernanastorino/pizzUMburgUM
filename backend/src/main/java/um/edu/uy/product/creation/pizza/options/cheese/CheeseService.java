package um.edu.uy.product.creation.pizza.options.cheese;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CheeseService {
    private final CheeseRepository repository;

    public List<Cheese> findAll() {
        return repository.findAll().stream()
                .filter(Cheese::isAvailable)
                .toList();
    }

    public Cheese create(Cheese item) {
        if (repository.existsByName(item.getName())) throw new RuntimeException("Cheese already exists");
        return repository.save(item);
    }

    public Cheese update(Long id, Cheese newItem) {
        Cheese item = repository.findById(id).orElseThrow(() -> new RuntimeException("Cheese not found"));
        item.setName(newItem.getName());
        item.setPriceSmall(newItem.getPriceSmall());
        item.setPriceMedium(newItem.getPriceMedium());
        item.setPriceLarge(newItem.getPriceLarge());
        item.setAvailable(newItem.isAvailable());
        return repository.save(item);
    }

    public void delete(Long id) {
        Cheese item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Beverage not found"));

        item.setAvailable(false);
        repository.save(item);
    }

}