package um.edu.uy.product.creation.topping;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ToppingController {

    private final ToppingService toppingService;

    @GetMapping("/toppings")
    public List<Topping> getAllToppings() {
        return toppingService.findAll();
    }

    @PostMapping("/toppings")
    public Topping createTopping(@RequestBody Topping item) {
        return toppingService.create(item);
    }

    @PutMapping("/toppings/{id}")
    public Topping update(@PathVariable Long id, @RequestBody Topping item) {
        return toppingService.update(id, item);
    }

    @DeleteMapping("/toppings/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        toppingService.delete(id);
        return ResponseEntity.noContent().build();
    }
}