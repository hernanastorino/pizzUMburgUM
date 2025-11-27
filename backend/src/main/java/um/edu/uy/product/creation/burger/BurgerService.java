package um.edu.uy.product.creation.burger;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import um.edu.uy.product.creation.topping.Topping;
import um.edu.uy.product.creation.burger.dto.BurgerRequest;
import um.edu.uy.product.creation.burger.options.bread.Bread;
import um.edu.uy.product.creation.burger.options.condiment.Condiment;
import um.edu.uy.product.creation.burger.options.meat.Meat;
import um.edu.uy.product.creation.burger.options.bread.BreadRepository;
import um.edu.uy.product.creation.burger.options.condiment.CondimentRepository;
import um.edu.uy.product.creation.burger.options.meat.MeatRepository;
import um.edu.uy.product.creation.topping.ToppingRepository;
import um.edu.uy.product.creation.relations.CreationInOrderRepository;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BurgerService {

    private final BurgerRepository burgerRepository;
    private final CreationInOrderRepository creationInOrderRepository;
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

        burger.setSubtotal(burger.calculateSubtotal());
        return burgerRepository.save(burger);
    }

    public Burger updateBurgerFromRequest(Long id, BurgerRequest req) {

        Burger original = getBurgerById(id);

        boolean isUsedInPendingOrder =
                !creationInOrderRepository.findPendingOrdersUsingCreation(id).isEmpty();

        if (!isUsedInPendingOrder) {
            // modificar en la base directamente
            return updateExistingBurger(original, req);
        }

        // crear una copia nueva
        Burger copy = duplicateBurger(original);

        return updateExistingBurger(copy, req);
    }

    private Burger duplicateBurger(Burger b) {
        Burger copy = Burger.builder()
                .name(b.getName())
                .user(b.getUser())
                .meatQuantity(b.getMeatQuantity())
                .condiment(b.getCondiment())
                .bread(b.getBread())
                .meat(b.getMeat())
                .toppings(new HashSet<>(b.getToppings()))
                .build();

        copy.setSubtotal(copy.calculateSubtotal());
        return burgerRepository.save(copy);
    }

    private Burger updateExistingBurger(Burger burger, BurgerRequest req) {

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

        burger.setSubtotal(burger.calculateSubtotal());
        return burgerRepository.save(burger);
    }

    public void deleteBurgerById(Long id) {
        if (!burgerRepository.existsById(id)) {
            throw new RuntimeException("Burger not found: " + id);
        }
        burgerRepository.deleteById(id);
    }
}