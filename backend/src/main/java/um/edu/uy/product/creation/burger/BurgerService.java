package um.edu.uy.product.creation.burger;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import um.edu.uy.product.creation.Topping;
import um.edu.uy.product.creation.burger.dto.BurgerRequest;
import um.edu.uy.product.creation.burger.options.Bread;
import um.edu.uy.product.creation.burger.options.Condiment;
import um.edu.uy.product.creation.burger.options.Meat;
import um.edu.uy.product.creation.burger.repo.BreadRepository;
import um.edu.uy.product.creation.burger.repo.CondimentRepository;
import um.edu.uy.product.creation.burger.repo.MeatRepository;
import um.edu.uy.product.creation.ToppingRepository;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BurgerService {

    private final BurgerRepository burgerRepository;
    private final CondimentRepository condimentRepository;
    private final BreadRepository breadRepository;
    private final MeatRepository meatRepository;
    private final ToppingRepository toppingRepository;
    private final UserRepository userRepository;

    public Burger getBurgerById(Long id) {
        return burgerRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Burger not found")) ;
    }

    public List<Burger> findAllBurgers() {
        return burgerRepository.findAll();
    }

    public Burger saveBurgerFromRequest(BurgerRequest req) {
        User user = userRepository.findById(req.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Condiment condiment = condimentRepository.findById(req.condimentId())
                .orElseThrow(() -> new RuntimeException("Condiment not found"));

        Bread bread = breadRepository.findById(req.breadId())
                .orElseThrow(() -> new RuntimeException("Bread not found"));

        Meat meat = meatRepository.findById(req.meatId())
                .orElseThrow(() -> new RuntimeException("Meat not found"));

        Burger burger = Burger.builder()
                .name(req.name())
                .user(user)
                .meatQuantity(req.meatQuantity())
                .condiment((condiment))
                .bread(bread)
                .meat(meat)
                .toppings(new HashSet<>())
                .build();

        if (req.toppingIds() != null) {
            req.toppingIds().forEach(toppingId -> {
                Topping topping = toppingRepository.findById(toppingId)
                        .orElseThrow(() -> new RuntimeException("Topping not found"));
                burger.addTopping(topping);
            });
        }

        return burgerRepository.save(burger);
    }

    public Burger updateBurgerFromRequest(Long id, BurgerRequest req) {
        Burger burger = getBurgerById(id);

        burger.setName(req.name());
        burger.setMeatQuantity(req.meatQuantity());

        burger.setCondiment(condimentRepository.findById(req.condimentId())
                .orElseThrow(() -> new RuntimeException("Condiment not found")));

        burger.setBread(breadRepository.findById(req.breadId())
                .orElseThrow(() -> new RuntimeException("Bread not found")));

        burger.setMeat(meatRepository.findById(req.meatId())
                .orElseThrow(() -> new RuntimeException("Meat not found")));

        burger.getToppings().clear();

        if (req.toppingIds() != null) {
            req.toppingIds().forEach(toppingId -> {
                Topping topping = toppingRepository.findById(toppingId)
                        .orElseThrow(() -> new RuntimeException("Topping not found"));
                burger.addTopping(topping);
            });
        }

        return burgerRepository.save(burger);
    }

    public void deleteBurgerById(Long id) {
        if (!burgerRepository.existsById(id)) {
            throw new RuntimeException("Burger not found: " + id);
        }
        burgerRepository.deleteById(id);
    }
}