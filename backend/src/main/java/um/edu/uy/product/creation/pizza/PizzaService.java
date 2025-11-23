package um.edu.uy.product.creation.pizza;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import um.edu.uy.product.creation.Topping;
import um.edu.uy.product.creation.ToppingRepository;
import um.edu.uy.product.creation.pizza.dto.PizzaRequest;
import um.edu.uy.product.creation.pizza.options.Cheese;
import um.edu.uy.product.creation.pizza.options.Dough;
import um.edu.uy.product.creation.pizza.options.Sauce;
import um.edu.uy.product.creation.pizza.repo.CheeseRepository;
import um.edu.uy.product.creation.pizza.repo.DoughRepository;
import um.edu.uy.product.creation.pizza.repo.SauceRepository;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PizzaService {

    private final PizzaRepository pizzaRepository;
    private final CheeseRepository cheeseRepository;
    private final DoughRepository doughRepository;
    private final SauceRepository sauceRepository;
    private final ToppingRepository toppingRepository;
    private final UserRepository userRepository;

    public Pizza getPizzaById(Long id) {
        return pizzaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pizza not found"));
    }

    public List<Pizza> findAllPizzas() {
        return pizzaRepository.findAll();
    }

    public Pizza savePizzaFromRequest(PizzaRequest req) {
        User user = userRepository.findById(req.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cheese cheese = cheeseRepository.findById(req.cheeseId())
                .orElseThrow(() -> new RuntimeException("Cheese not found"));

        Dough dough = doughRepository.findById(req.doughId())
                .orElseThrow(() -> new RuntimeException("Dough not found"));

        Sauce sauce = sauceRepository.findById(req.sauceId())
                .orElseThrow(() -> new RuntimeException("Sauce not found"));

        Pizza pizza = Pizza.builder()
                .name(req.name())
                .user(user)
                .size(req.size())
                .cheese(cheese)
                .dough(dough)
                .sauce(sauce)
                .toppings(new HashSet<>())
                .build();

        if (req.toppingIds() != null) {
            req.toppingIds().forEach(toppingId -> {
                Topping topping = toppingRepository.findById(toppingId)
                        .orElseThrow(() -> new RuntimeException("Topping not found"));
                pizza.addTopping(topping);
            });
        }

        return pizzaRepository.save(pizza);
    }

    public Pizza updatePizzaFromRequest(Long id, PizzaRequest req) {
        Pizza pizza = getPizzaById(id);

        pizza.setName(req.name());
        pizza.setSize(req.size());

        pizza.setCheese(cheeseRepository.findById(req.cheeseId())
                .orElseThrow(() -> new RuntimeException("Cheese not found")));

        pizza.setDough(doughRepository.findById(req.doughId())
                .orElseThrow(() -> new RuntimeException("Dough not found")));

        pizza.setSauce(sauceRepository.findById(req.sauceId())
                .orElseThrow(() -> new RuntimeException("Sauce not found")));

        pizza.getToppings().clear();

        if (req.toppingIds() != null) {
            req.toppingIds().forEach(toppingId -> {
                Topping topping = toppingRepository.findById(toppingId)
                        .orElseThrow(() -> new RuntimeException("Topping not found"));
                pizza.addTopping(topping);
            });
        }

        return pizzaRepository.save(pizza);
    }

    public void deletePizzaById(Long id) {
        if (!pizzaRepository.existsById(id)) {
            throw new RuntimeException("Pizza not found");
        }
        pizzaRepository.deleteById(id);
    }
}