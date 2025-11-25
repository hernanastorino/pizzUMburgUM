package um.edu.uy.product.catalog;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import um.edu.uy.product.beverage.BeverageRepository;
import um.edu.uy.product.creation.burger.options.bread.BreadRepository;
import um.edu.uy.product.creation.burger.options.condiment.CondimentRepository;
import um.edu.uy.product.creation.burger.options.meat.MeatRepository;
import um.edu.uy.product.creation.pizza.options.cheese.CheeseRepository;
import um.edu.uy.product.creation.pizza.options.dough.DoughRepository;
import um.edu.uy.product.creation.pizza.options.sauce.SauceRepository;
import um.edu.uy.product.creation.topping.ToppingRepository;
import um.edu.uy.product.side.SideRepository;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final BreadRepository breadRepository;
    private final MeatRepository meatRepository;
    private final CheeseRepository cheeseRepository;
    private final ToppingRepository toppingRepository;
    private final SideRepository sideRepository;
    private final BeverageRepository beverageRepository;
    private final DoughRepository doughRepository;
    private final SauceRepository sauceRepository;
    private final CondimentRepository condimentRepository;

    public Map<String, Object> getAllOptions() {
        return Map.of(
                "breads", breadRepository.findAll(),
                "meats", meatRepository.findAll(),
                "cheeses", cheeseRepository.findAll(),
                "toppings", toppingRepository.findAll(),
                "sides", sideRepository.findAll(),
                "beverages", beverageRepository.findAll(),
                "doughs", doughRepository.findAll(),
                "sauces", sauceRepository.findAll(),
                "condiments", condimentRepository.findAll()
        );
    }
}