package um.edu.uy.product.beverage;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/beverages")
@RequiredArgsConstructor
public class BeverageController {

    private final BeverageService beverageService;

    @GetMapping
    public List<Beverage> getAllBeverages() {
        return beverageService.findAll();
    }

    @GetMapping("/{id}")
    public Beverage getBeverageById(@PathVariable Long id) {
        return beverageService.getBeverageById(id);
    }

    public Beverage createBeverage(@RequestBody Beverage beverage) {
        return beverageService.save(beverage);
    }

    @PutMapping("/{id}")
    public Beverage updateBeverage(@PathVariable Long id, @RequestBody Beverage beverage) {
        Beverage existingBeverage = beverageService.getBeverageById(id);
        existingBeverage.setName(beverage.getName());
        existingBeverage.setPrice(beverage.getPrice());

        return beverageService.save(existingBeverage);
    }

    @DeleteMapping
    public void deleteBeverage(@PathVariable Long id) {
        beverageService.delete(id);
    }
}
