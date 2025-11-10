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

    public List<Beverage> findAll() {
        return beverageRepository.findAll();
    }

    public Beverage save(Beverage beverage) {
        return beverageRepository.save(beverage);
    }

    public void delete(Long id) {
        beverageRepository.deleteById(id);
    }
}