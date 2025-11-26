package um.edu.uy.product.beverage;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BeverageService {

    private final BeverageRepository beverageRepository;

    public Beverage getBeverageById(Long id) {
        return beverageRepository.findById(id).orElseThrow(() -> new RuntimeException("Beverage not found"));
    }

    public List<Beverage> findAllBeverages() {
        return beverageRepository.findAll().stream()
                .filter(Beverage::isAvailable)
                .toList();
    }

    public Beverage saveBeverage(Beverage beverage) {
        return beverageRepository.save(beverage);
    }

    public void delete(Long id) {
        Beverage item = beverageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Beverage not found"));

        item.setAvailable(false);
        beverageRepository.save(item);
    }
}