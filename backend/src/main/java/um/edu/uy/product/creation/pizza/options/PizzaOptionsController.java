package um.edu.uy.product.creation.pizza.options;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.product.creation.pizza.options.cheese.Cheese;
import um.edu.uy.product.creation.pizza.options.cheese.CheeseService;
import um.edu.uy.product.creation.pizza.options.dough.Dough;
import um.edu.uy.product.creation.pizza.options.dough.DoughService;
import um.edu.uy.product.creation.pizza.options.sauce.Sauce;
import um.edu.uy.product.creation.pizza.options.sauce.SauceService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class PizzaOptionsController {

    private final DoughService doughService;
    private final CheeseService cheeseService;
    private final SauceService sauceService;

    // doughs
    @GetMapping("/doughs")
    public List<Dough> getAllDoughs() { return doughService.findAll(); }

    @PostMapping("/doughs")
    public Dough createDough(@RequestBody Dough item) { return doughService.create(item); }

    @PutMapping("/doughs/{id}")
    public Dough updateDough(@PathVariable Long id, @RequestBody Dough item) { return doughService.update(id, item); }

    @DeleteMapping("/doughs/{id}")
    public ResponseEntity<Void> deleteDough(@PathVariable Long id) {
        doughService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // cheeses
    @GetMapping("/cheeses")
    public List<Cheese> getAllCheeses() { return cheeseService.findAll(); }

    @PostMapping("/cheeses")
    public Cheese createCheese(@RequestBody Cheese item) { return cheeseService.create(item); }

    @PutMapping("/cheeses/{id}")
    public Cheese updateCheese(@PathVariable Long id, @RequestBody Cheese item) { return cheeseService.update(id, item); }

    @DeleteMapping("/cheeses/{id}")
    public ResponseEntity<Void> deleteCheese(@PathVariable Long id) {
        cheeseService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // sauces
    @GetMapping("/sauces")
    public List<Sauce> getAllSauces() { return sauceService.findAll(); }

    @PostMapping("/sauces")
    public Sauce createSauce(@RequestBody Sauce item) { return sauceService.create(item); }

    @PutMapping("/sauces/{id}")
    public Sauce updateSauce(@PathVariable Long id, @RequestBody Sauce item) { return sauceService.update(id, item); }

    @DeleteMapping("/sauces/{id}")
    public ResponseEntity<Void> deleteSauce(@PathVariable Long id) {
        sauceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}