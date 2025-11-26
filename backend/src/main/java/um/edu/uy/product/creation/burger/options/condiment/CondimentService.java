package um.edu.uy.product.creation.burger.options.condiment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CondimentService {
    private final CondimentRepository repository;

    public List<Condiment> findAll() {
        return repository.findAll().stream()
                .filter(Condiment::isAvailable)
                .toList();
    }

    public Condiment create(Condiment item) {
        if (repository.existsByName(item.getName())) throw new RuntimeException("Condiment already exists");
        return repository.save(item);
    }

    public Condiment update(Long id, Condiment newItem) {
        Condiment item = repository.findById(id).orElseThrow(() -> new RuntimeException("Condiment not found"));
        item.setName(newItem.getName());
        item.setPriceSmall(newItem.getPriceSmall());
        item.setPriceMedium(newItem.getPriceMedium());
        item.setPriceLarge(newItem.getPriceLarge());
        item.setAvailable(newItem.isAvailable());
        return repository.save(item);
    }

    public void delete(Long id) {
        Condiment item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Beverage not found"));

        item.setAvailable(false);
        repository.save(item);
    }

}