package um.edu.uy.product.beverage;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/beverages")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // <--- AGREGADO
public class BeverageController {

    private final BeverageService beverageService;

    @GetMapping
    public List<BeverageResponse> findAllBeverages() {
        return beverageService.findAllBeverages().stream().map(BeverageResponse::new).toList();
    }

    @GetMapping("/{id}")
    public BeverageResponse getBeverageById(@PathVariable Long id) {
        return new BeverageResponse(beverageService.getBeverageById(id));
    }

    @PostMapping
    public BeverageResponse createBeverage(@RequestBody Beverage beverage) {
        Beverage savedBeverage = beverageService.saveBeverage(beverage);
        return new BeverageResponse(savedBeverage);
    }

    @PutMapping("/{id}")
    public BeverageResponse updateBeverage(@PathVariable Long id, @RequestBody Beverage beverage) {
        Beverage existingBeverage = beverageService.getBeverageById(id);

        existingBeverage.setName(beverage.getName());
        existingBeverage.setPrice(beverage.getPrice());

        Beverage updatedBeverage = beverageService.saveBeverage(existingBeverage);
        return new BeverageResponse(updatedBeverage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBeverage(@PathVariable Long id) {
        beverageService.deleteBeverageById(id);
        return ResponseEntity.noContent().build();
    }
}