package um.edu.uy.product.creation.burger.options.bread;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BreadService {
    private final BreadRepository repository;

    public List<Bread> findAll() {
        return repository.findAll().stream()
                .filter(Bread::isAvailable)
                .toList();
    }

    public Bread create(Bread item) {
        if (repository.existsByName(item.getName())) throw new RuntimeException("Bread already exists");
        return repository.save(item);
    }

    public Bread update(Long id, Bread newItem) {
        Bread item = repository.findById(id).orElseThrow(() -> new RuntimeException("Bread not found"));
        item.setName(newItem.getName());
        item.setPriceSmall(newItem.getPriceSmall());
        item.setPriceMedium(newItem.getPriceMedium());
        item.setPriceLarge(newItem.getPriceLarge());
        item.setAvailable(newItem.isAvailable());
        return repository.save(item);
    }

    public void delete(Long id) {
        Bread item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Beverage not found"));

        item.setAvailable(false);
        repository.save(item);
    }
}