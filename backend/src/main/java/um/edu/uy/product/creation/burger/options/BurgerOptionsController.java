package um.edu.uy.product.creation.burger.options;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.product.creation.burger.options.bread.Bread;
import um.edu.uy.product.creation.burger.options.bread.BreadService;
import um.edu.uy.product.creation.burger.options.condiment.Condiment;
import um.edu.uy.product.creation.burger.options.condiment.CondimentService;
import um.edu.uy.product.creation.burger.options.meat.Meat;
import um.edu.uy.product.creation.burger.options.meat.MeatService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // <--- IMPORTANTE: CORS ACTIVADO
public class BurgerOptionsController {

    private final BreadService breadService;
    private final MeatService meatService;
    private final CondimentService condimentService;

    // --- BREADS (Panes) ---
    @GetMapping("/breads")
    public List<Bread> getAllBreads() { return breadService.findAll(); }

    @PostMapping("/breads")
    public Bread createBread(@RequestBody Bread item) { return breadService.create(item); }

    @PutMapping("/breads/{id}")
    public Bread updateBread(@PathVariable Long id, @RequestBody Bread item) { return breadService.update(id, item); }

    @DeleteMapping("/breads/{id}")
    public ResponseEntity<Void> deleteBread(@PathVariable Long id) {
        breadService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // --- MEATS (Carnes) ---
    @GetMapping("/meats")
    public List<Meat> getAllMeats() { return meatService.findAll(); }

    @PostMapping("/meats")
    public Meat createMeat(@RequestBody Meat item) { return meatService.create(item); }

    @PutMapping("/meats/{id}")
    public Meat updateMeat(@PathVariable Long id, @RequestBody Meat item) { return meatService.update(id, item); }

    @DeleteMapping("/meats/{id}")
    public ResponseEntity<Void> deleteMeat(@PathVariable Long id) {
        meatService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // --- CONDIMENTS (Aderezos) ---
    @GetMapping("/condiments")
    public List<Condiment> getAllCondiments() { return condimentService.findAll(); }

    @PostMapping("/condiments")
    public Condiment createCondiment(@RequestBody Condiment item) { return condimentService.create(item); }

    @PutMapping("/condiments/{id}")
    public Condiment updateCondiment(@PathVariable Long id, @RequestBody Condiment item) { return condimentService.update(id, item); }

    @DeleteMapping("/condiments/{id}")
    public ResponseEntity<Void> deleteCondiment(@PathVariable Long id) {
        condimentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}