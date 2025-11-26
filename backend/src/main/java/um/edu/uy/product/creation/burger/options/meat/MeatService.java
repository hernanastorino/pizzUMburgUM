package um.edu.uy.product.creation.burger.options.meat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MeatService {
    private final MeatRepository repository;

    public List<Meat> findAll() {
        return repository.findAll().stream()
                .filter(Meat::isAvailable)
                .toList();
    }

    public Meat create(Meat item) {
        if (repository.existsByName(item.getName())) throw new RuntimeException("Meat already exists");
        return repository.save(item);
    }

    public Meat update(Long id, Meat newItem) {
        Meat item = repository.findById(id).orElseThrow(() -> new RuntimeException("Meat not found"));
        item.setName(newItem.getName());
        item.setPriceSmall(newItem.getPriceSmall());
        item.setPriceMedium(newItem.getPriceMedium());
        item.setPriceLarge(newItem.getPriceLarge());
        item.setAvailable(newItem.isAvailable());
        return repository.save(item);
    }
    public void delete(Long id) {
        Meat item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meat not found"));

        item.setAvailable(false);
        repository.save(item);
    }
}