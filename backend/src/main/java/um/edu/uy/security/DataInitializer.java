package um.edu.uy.security;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

// REPOSITORIOS
import um.edu.uy.order.Order;
import um.edu.uy.order.OrderRepository;
import um.edu.uy.order.OrderService;
import um.edu.uy.product.beverage.Beverage;
import um.edu.uy.product.beverage.BeverageRepository;
import um.edu.uy.product.creation.CreationRepository;
import um.edu.uy.product.creation.Topping;
import um.edu.uy.product.creation.ToppingRepository;
import um.edu.uy.product.creation.burger.Burger;
import um.edu.uy.product.creation.burger.options.Bread;
import um.edu.uy.product.creation.burger.options.Meat;
import um.edu.uy.product.creation.burger.repo.BreadRepository;
import um.edu.uy.product.creation.burger.repo.MeatRepository;
import um.edu.uy.product.creation.pizza.Pizza;
import um.edu.uy.product.creation.pizza.options.Cheese;
import um.edu.uy.product.creation.pizza.options.Dough;
import um.edu.uy.product.creation.pizza.options.Sauce;
import um.edu.uy.product.creation.pizza.repo.CheeseRepository;
import um.edu.uy.product.creation.pizza.repo.DoughRepository;
import um.edu.uy.product.creation.pizza.repo.SauceRepository;
import um.edu.uy.product.side.Side;
import um.edu.uy.product.side.SideRepository;
import um.edu.uy.user.Role;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;
import um.edu.uy.user.client.data.adress.Address;
import um.edu.uy.user.client.data.adress.AddressRepository;
import um.edu.uy.user.client.data.payment.method.PaymentMethod;
import um.edu.uy.user.client.data.payment.method.PaymentMethodRepository;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            BreadRepository breadRepository,
            MeatRepository meatRepository,
            CheeseRepository cheeseRepository,
            SideRepository sideRepository,
            BeverageRepository beverageRepository,
            ToppingRepository toppingRepository,
            DoughRepository doughRepository,
            SauceRepository sauceRepository,
            AddressRepository addressRepository,
            PaymentMethodRepository paymentMethodRepository,
            OrderRepository orderRepository,
            CreationRepository creationRepository,
            OrderService orderService) {

        return args -> {
            // =====================================================
            // 1. INICIALIZACIÓN DE USUARIOS
            // =====================================================
            User adminUser, clientA, clientB;

            if (userRepository.findByRole(Role.adminRole).isEmpty()) {
                adminUser = new User();
                adminUser.setEmail("admin@pizzum.com");
                adminUser.setPassword(passwordEncoder.encode("1234!"));
                adminUser.setRole(Role.adminRole);
                userRepository.save(adminUser);

                clientA = new User();
                clientA.setEmail("clienta@pizzum.com");
                clientA.setPassword(passwordEncoder.encode("1234!"));
                clientA.setRole(Role.clientRole);
                userRepository.save(clientA);

                clientB = new User();
                clientB.setEmail("clientb@pizzum.com");
                clientB.setPassword(passwordEncoder.encode("1234!"));
                clientB.setRole(Role.clientRole);
                userRepository.save(clientB);
                System.out.println("Usuarios creados.");
            }

            // Recuperamos las instancias frescas
            adminUser = userRepository.findByRole(Role.adminRole).stream().findFirst().orElseThrow();
            clientA = userRepository.findByEmail("clienta@pizzum.com").orElseThrow();
            clientB = userRepository.findByEmail("clientb@pizzum.com").orElseThrow();

            // =====================================================
            // 2. INICIALIZACIÓN DEL CATÁLOGO
            // =====================================================

            // --- PANES ---
            if (breadRepository.count() == 0) {
                breadRepository.saveAll(List.of(
                        Bread.builder().name("Pan Brioche").price(50.0).isAvailable(true).build(),
                        Bread.builder().name("Pan de Papa").price(40.0).isAvailable(true).build(),
                        Bread.builder().name("Pan Integral").price(30.0).isAvailable(true).build(),
                        Bread.builder().name("Pan Sin Gluten").price(60.0).isAvailable(true).build()
                ));
            }

            // --- CARNES ---
            if (meatRepository.count() == 0) {
                meatRepository.saveAll(List.of(
                        Meat.builder().name("Carne de Res 180g").price(150.0).isAvailable(true).build(),
                        Meat.builder().name("Pollo Crispy").price(130.0).isAvailable(true).build(),
                        Meat.builder().name("Hamburguesa de Lentejas").price(120.0).isAvailable(true).build()
                ));
            }

            // --- QUESOS ---
            if (cheeseRepository.count() == 0) {
                cheeseRepository.saveAll(List.of(
                        Cheese.builder().name("Cheddar").price(30.0).isAvailable(true).build(),
                        Cheese.builder().name("Dambo").price(30.0).isAvailable(true).build(),
                        Cheese.builder().name("Roquefort").price(45.0).isAvailable(true).build(),
                        Cheese.builder().name("Provolone").price(40.0).isAvailable(true).build()
                ));
            }

            // --- PIZZA OPTIONS ---
            if (doughRepository.count() == 0) {
                doughRepository.saveAll(List.of(
                        Dough.builder().name("Masa Clásica").price(100.0).isAvailable(true).build(),
                        Dough.builder().name("Masa Fina").price(90.0).isAvailable(true).build()
                ));
            }
            if (sauceRepository.count() == 0) {
                sauceRepository.saveAll(List.of(
                        Sauce.builder().name("Salsa Tomate").price(50.0).isAvailable(true).build(),
                        Sauce.builder().name("Salsa Pesto").price(70.0).isAvailable(true).build()
                ));
            }

            // --- TOPPINGS ---
            if (toppingRepository.count() == 0) {
                toppingRepository.saveAll(List.of(
                        Topping.builder().name("Panceta").price(50.0).build(),
                        Topping.builder().name("Rúcula").price(20.0).build(),
                        Topping.builder().name("Pepperoni").price(45.0).build(),
                        Topping.builder().name("Champiñones").price(35.0).build(),
                        Topping.builder().name("Cebolla Caramelizada").price(30.0).build(),
                        Topping.builder().name("Huevo").price(25.0).build(),
                        Topping.builder().name("Olivas Negras").price(15.0).build(),
                        Topping.builder().name("Anchoas").price(60.0).build(),
                        Topping.builder().name("Albahaca").price(15.0).build()
                ));
            }

            // --- SIDES & BEVERAGES ---
            if (sideRepository.count() == 0) {
                sideRepository.saveAll(List.of(
                        Side.builder().name("Papas Fritas Clásicas").price(100.0).isAvailable(true).build(),
                        Side.builder().name("Aros de Cebolla").price(120.0).isAvailable(true).build(),
                        Side.builder().name("Boniato Frito").price(110.0).isAvailable(true).build()
                ));
            }
            if (beverageRepository.count() == 0) {
                beverageRepository.saveAll(List.of(
                        Beverage.builder().name("Coca Cola 500ml").price(80.0).isAvailable(true).build(),
                        Beverage.builder().name("Agua Sin Gas").price(60.0).isAvailable(true).build(),
                        Beverage.builder().name("Cerveza Artesanal").price(150.0).isAvailable(true).build()
                ));
            }

            // =====================================================
            // 3. RECUPERACIÓN SEGURA (USANDO orElseGet PARA NO DUPLICAR)
            // =====================================================

            Bread bBrioche = breadRepository.findByName("Pan Brioche").orElseGet(() ->
                    breadRepository.save(Bread.builder().name("Pan Brioche").price(50.0).isAvailable(true).build()));

            Meat mRes = meatRepository.findByName("Carne de Res 180g").orElseGet(() ->
                    meatRepository.save(Meat.builder().name("Carne de Res 180g").price(150.0).isAvailable(true).build()));

            Cheese cCheddar = cheeseRepository.findByName("Cheddar").orElseGet(() ->
                    cheeseRepository.save(Cheese.builder().name("Cheddar").price(30.0).isAvailable(true).build()));

            Dough dClasica = doughRepository.findByName("Masa Clásica").orElseGet(() ->
                    doughRepository.save(Dough.builder().name("Masa Clásica").price(100.0).isAvailable(true).build()));

            Sauce sTomate = sauceRepository.findByName("Salsa Tomate").orElseGet(() ->
                    sauceRepository.save(Sauce.builder().name("Salsa Tomate").price(50.0).isAvailable(true).build()));

            Topping tPanceta = toppingRepository.findByName("Panceta").orElseGet(() ->
                    toppingRepository.save(Topping.builder().name("Panceta").price(50.0).build()));

            Topping tRucula = toppingRepository.findByName("Rúcula").orElseGet(() ->
                    toppingRepository.save(Topping.builder().name("Rúcula").price(20.0).build()));

            Topping tPepperoni = toppingRepository.findByName("Pepperoni").orElseGet(() ->
                    toppingRepository.save(Topping.builder().name("Pepperoni").price(45.0).build()));

            Topping tChampignon = toppingRepository.findByName("Champiñones").orElseGet(() ->
                    toppingRepository.save(Topping.builder().name("Champiñones").price(35.0).build()));

            Side sPapas = sideRepository.findByName("Papas Fritas Clásicas").orElseGet(() ->
                    sideRepository.save(Side.builder().name("Papas Fritas Clásicas").price(100.0).isAvailable(true).build()));

            Beverage bCoca = beverageRepository.findByName("Coca Cola 500ml").orElseGet(() ->
                    beverageRepository.save(Beverage.builder().name("Coca Cola 500ml").price(80.0).isAvailable(true).build()));

            // =====================================================
            // 4. INFO DEL CLIENTE (DIRECCIÓN Y PAGO) - ¡BLINDADO!
            // =====================================================

            // FIX: Creamos una variable FINAL para usar en las lambdas
            User finalClientA = clientA;

            Address addrHome = addressRepository.findAll().stream()
                    .filter(a -> a.getUser().getUserId().equals(finalClientA.getUserId()))
                    .findFirst()
                    .orElse(null);

            if (addrHome == null) {
                System.out.println("Creando Dirección para Client A...");
                Address newAddr = Address.builder()
                        .user(clientA)
                        .name("Casa")
                        .street("Av. 18 de Julio")
                        .aptNumber("1234")
                        .doorNumber("001")
                        .indications("Frente a la farmacia")
                        .build();
                addrHome = addressRepository.save(newAddr);
            }

            // Usamos la misma variable final
            PaymentMethod pmCard = paymentMethodRepository.findAll().stream()
                    .filter(pm -> pm.getUser().getUserId().equals(finalClientA.getUserId()))
                    .findFirst()
                    .orElse(null);

            if (pmCard == null) {
                System.out.println("Creando Método de Pago para Client A...");
                PaymentMethod newPm = PaymentMethod.builder()
                        .user(clientA)
                        .cardName("Visa Débito")
                        .cardNumber("1234567812345678")
                        .cvv("123")
                        .ownerName("Cliente A Demo")
                        .build();
                pmCard = paymentMethodRepository.save(newPm);
            }

            // =====================================================
            // 5. CREACIONES DE PRUEBA
            // =====================================================
            Burger bFavoritaA = null;

            if (creationRepository.count() == 0) {
                System.out.println("Cargando Creaciones de prueba...");
                bFavoritaA = Burger.builder()
                        .name("Burger Clásica Favorita")
                        .user(clientA)
                        .isFavorite(true)
                        .meatQuantity(1)
                        .bread(bBrioche)
                        .meat(mRes)
                        .toppings(Set.of(tPanceta))
                        .build();
                bFavoritaA = creationRepository.save(bFavoritaA);

                Pizza p = Pizza.builder()
                        .name("Pizza Demo")
                        .user(clientA)
                        .isFavorite(false)
                        .size("Grande")
                        .dough(dClasica)
                        .cheese(cCheddar)
                        .sauce(sTomate)
                        .toppings(new HashSet<>())
                        .build();
                creationRepository.save(p);
            } else {
                bFavoritaA = (Burger) creationRepository.findAll().stream()
                        .filter(c -> c instanceof Burger).findFirst().orElse(null);
            }

            // =====================================================
            // 6. ÓRDENES DE PRUEBA
            // =====================================================
            if (orderRepository.count() == 0) {
                System.out.println("Cargando Órdenes de prueba...");

                // --- 6.1 ORDEN 1: COMPLETADA
                Order order1 = Order.builder()
                        .client(clientA)
                        .address(addrHome)
                        .paymentMethod(pmCard)
                        .state("DELIVERED")
                        .date(LocalDateTime.now().minusDays(2))
                        .total(0.0)
                        .itemsCreation(new HashSet<>())
                        .itemsBeverage(new HashSet<>())
                        .itemsSide(new HashSet<>())
                        .build();

                orderRepository.save(order1);

                if (bFavoritaA != null) orderService.addOrUpdateCreation(order1, bFavoritaA, 2);
                orderService.addBeverage(order1, bCoca, 1);
                orderService.addSide(order1, sPapas, 1);
                orderService.recalculateTotal(order1);
                orderRepository.save(order1);

                // --- 6.2 ORDEN 2: PENDIENTE (fixed: include address + paymentMethod + client)
                Order order2 = Order.builder()
                        .client(clientA)
                        .address(addrHome)           // <-- required
                        .paymentMethod(pmCard)      // <-- required
                        .state("PENDING")
                        .date(LocalDateTime.now())
                        .total(0.0)
                        .itemsCreation(new HashSet<>())
                        .itemsBeverage(new HashSet<>())
                        .itemsSide(new HashSet<>())
                        .build();

                orderRepository.save(order2);

                // Optionally add some items to order2 for realism; example:
                 if (bFavoritaA != null) orderService.addOrUpdateCreation(order2, bFavoritaA, 1);
                 orderService.addBeverage(order2, bCoca, 1);
                 orderService.recalculateTotal(order2);
                 orderRepository.save(order2);

                System.out.println("Órdenes cargadas exitosamente.");
            }


            System.out.println("¡INICIALIZACIÓN FINALIZADA! Backend listo.");
        };
    }
}