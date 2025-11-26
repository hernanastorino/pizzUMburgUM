package um.edu.uy.product.creation.pizza.options.sauce;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SauceService {
    private final SauceRepository repository;

    public List<Sauce> findAll() {
        return repository.findAll().stream()
                .filter(Sauce::isAvailable)
                .toList();
    }

    public Sauce create(Sauce item) {
        if (repository.existsByName(item.getName())) throw new RuntimeException("Sauce already exists");
        return repository.save(item);
    }

    public Sauce update(Long id, Sauce newItem) {
        Sauce item = repository.findById(id).orElseThrow(() -> new RuntimeException("Sauce not found"));
        item.setName(newItem.getName());
        item.setPriceSmall(newItem.getPriceSmall());
        item.setPriceMedium(newItem.getPriceMedium());
        item.setPriceLarge(newItem.getPriceLarge());
        item.setAvailable(newItem.isAvailable());
        return repository.save(item);
    }
    public void delete(Long id) {
        Sauce item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Beverage not found"));

        item.setAvailable(false);
        repository.save(item);
    }

}