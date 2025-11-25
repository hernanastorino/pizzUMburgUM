package um.edu.uy.product.creation.burger;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import um.edu.uy.product.creation.burger.dto.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/burgers")
@RequiredArgsConstructor
public class BurgerController {

    private final BurgerService burgerService;

    @GetMapping
    public List<BurgerResponse> findAllBurgers() {
        return burgerService.findAllBurgers().stream().map(BurgerResponse::new).toList();
    }

    @GetMapping("/{id}")
    public BurgerResponse getBurgerById(@PathVariable Long id) {
        return new BurgerResponse(burgerService.getBurgerById(id));
    }

    @PostMapping
    public BurgerResponse createBurger(@RequestBody BurgerRequest request) {
        return new BurgerResponse(burgerService.saveBurgerFromRequest(request));
    }

    @PutMapping("/{id}")
    public BurgerResponse updateBurger(@PathVariable Long id, @RequestBody BurgerRequest request) {
        return new BurgerResponse(burgerService.updateBurgerFromRequest(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBurger(@PathVariable Long id) {
        burgerService.deleteBurgerById(id);
        return ResponseEntity.noContent().build();
    }
}
