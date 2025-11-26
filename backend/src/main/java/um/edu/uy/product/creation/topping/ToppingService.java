package um.edu.uy.product.creation.topping;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ToppingService {

    private final ToppingRepository toppingRepository;

    public List<Topping> findAll() {
        return toppingRepository.findAll();
    }

    public Topping getById(Long id) {
        return toppingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topping not found"));
    }

    public Topping create(Topping topping) {
        if (toppingRepository.existsByName(topping.getName())) {
            throw new RuntimeException("Topping already exists");
        }
        return toppingRepository.save(topping);
    }

    public Topping update(Long id, Topping newInfo) {
        Topping existing = getById(id);
        existing.setName(newInfo.getName());
        existing.setPriceSmall(newInfo.getPriceSmall());
        existing.setPriceMedium(newInfo.getPriceMedium());
        existing.setPriceLarge(newInfo.getPriceLarge());
        existing.setAvailable(newInfo.isAvailable());
        return toppingRepository.save(existing);
    }

    public void delete(Long id) {
        if (!toppingRepository.existsById(id)) {
            throw new RuntimeException("Topping not found");
        }
        toppingRepository.deleteById(id);
    }
}