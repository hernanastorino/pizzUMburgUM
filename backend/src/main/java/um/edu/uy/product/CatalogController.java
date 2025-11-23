package um.edu.uy.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import um.edu.uy.product.creation.burger.repo.*;
import um.edu.uy.product.creation.pizza.repo.*;
import um.edu.uy.product.creation.*;
import um.edu.uy.product.side.SideRepository;
import um.edu.uy.product.beverage.BeverageRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {

    @Autowired private BreadRepository breadRepository;
    @Autowired private MeatRepository meatRepository;
    @Autowired private CheeseRepository cheeseRepository;
    @Autowired private ToppingRepository toppingRepository;
    @Autowired private SideRepository sideRepository;
    @Autowired private BeverageRepository beverageRepository;
    @Autowired private DoughRepository doughRepository;
    @Autowired private SauceRepository sauceRepository;
    @Autowired private CondimentRepository condimentRepository;

    @GetMapping("/options")
    public ResponseEntity<?> getAllOptions() {
        // Devolvemos un JSON gigante con todas las opciones para que el front cachee
        return ResponseEntity.ok(Map.of(
                "breads", breadRepository.findAll(),
                "meats", meatRepository.findAll(),
                "cheeses", cheeseRepository.findAll(),
                "toppings", toppingRepository.findAll(),
                "sides", sideRepository.findAll(),
                "beverages", beverageRepository.findAll(),
                "doughs", doughRepository.findAll(),
                "sauces", sauceRepository.findAll(),
                "condiments", condimentRepository.findAll()
        ));
    }
}
