package um.edu.uy.product.creation.pizza;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.product.creation.pizza.dto.PizzaRequest;
import um.edu.uy.product.creation.pizza.dto.PizzaResponse;

import java.util.List;

@RestController
@RequestMapping("/api/products/pizzas")
@RequiredArgsConstructor
public class PizzaController {

    private final PizzaService pizzaService;

    @GetMapping
    public List<PizzaResponse> findAllPizzas() {
        return pizzaService.findAllPizzas().stream().map(PizzaResponse::new).toList();
    }

    @GetMapping("/{id}")
    public PizzaResponse getPizzaById(@PathVariable Long id) {
        return new PizzaResponse(pizzaService.getPizzaById(id));
    }

    @PostMapping
    public PizzaResponse createPizza(@RequestBody PizzaRequest request) {
        return new PizzaResponse(pizzaService.savePizzaFromRequest(request));
    }

    @PutMapping("/{id}")
    public PizzaResponse updatePizza(@PathVariable Long id, @RequestBody PizzaRequest request) {
        return new PizzaResponse(pizzaService.updatePizzaFromRequest(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePizza(@PathVariable Long id) {
        pizzaService.deletePizzaById(id);
        return ResponseEntity.noContent().build();
    }
}
