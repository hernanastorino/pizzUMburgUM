package um.edu.uy.product.creation.topping;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/toppings")
@RequiredArgsConstructor
public class ToppingController {

    private final ToppingService toppingService;

    @GetMapping
    public ResponseEntity<List<Topping>> getAll() {
        return ResponseEntity.ok(toppingService.findAll());
    }

    @PostMapping
    public ResponseEntity<Topping> create(@RequestBody Topping topping) {
        return ResponseEntity.ok(toppingService.create(topping));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Topping> update(@PathVariable Long id, @RequestBody Topping topping) {
        return ResponseEntity.ok(toppingService.update(id, topping));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        toppingService.delete(id);
        return ResponseEntity.noContent().build();
    }
}