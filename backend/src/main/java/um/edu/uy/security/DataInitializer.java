package um.edu.uy.security;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

// REPOSITORIOS E IMPORTACIONES
import um.edu.uy.order.Order;
import um.edu.uy.order.OrderRepository;
import um.edu.uy.order.OrderService;
import um.edu.uy.order.OrderStatus;
import um.edu.uy.product.beverage.Beverage;
import um.edu.uy.product.beverage.BeverageRepository;
import um.edu.uy.product.creation.CreationRepository;
import um.edu.uy.product.creation.topping.Topping;
import um.edu.uy.product.creation.topping.ToppingRepository;
import um.edu.uy.product.creation.burger.Burger;
import um.edu.uy.product.creation.burger.options.bread.Bread;
import um.edu.uy.product.creation.burger.options.meat.Meat;
import um.edu.uy.product.creation.burger.options.bread.BreadRepository;
import um.edu.uy.product.creation.burger.options.meat.MeatRepository;
import um.edu.uy.product.creation.pizza.Pizza;
import um.edu.uy.product.creation.pizza.options.cheese.Cheese;
import um.edu.uy.product.creation.pizza.options.dough.Dough;
import um.edu.uy.product.creation.pizza.options.sauce.Sauce;
import um.edu.uy.product.creation.pizza.options.cheese.CheeseRepository;
import um.edu.uy.product.creation.pizza.options.dough.DoughRepository;
import um.edu.uy.product.creation.pizza.options.sauce.SauceRepository;
import um.edu.uy.product.side.Side;
import um.edu.uy.product.side.SideRepository;
import um.edu.uy.user.Role;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;
import um.edu.uy.user.client.data.adress.Address;
import um.edu.uy.user.client.data.adress.AddressRepository;
import um.edu.uy.user.client.data.payment.method.PaymentMethod;
import um.edu.uy.user.client.data.payment.method.PaymentMethodRepository;
import um.edu.uy.user.favorite.FavoriteCreation;
import um.edu.uy.user.favorite.FavoriteCreationRepository;

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
            FavoriteCreationRepository favoriteCreationRepository,
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
                adminUser.setName("Super");
                adminUser.setSurname("Admin");
                userRepository.save(adminUser);

                clientA = new User();
                clientA.setEmail("clienta@pizzum.com");
                clientA.setPassword(passwordEncoder.encode("1234!"));
                clientA.setRole(Role.clientRole);
                clientA.setName("Cliente");
                clientA.setSurname("Uno");
                userRepository.save(clientA);

                clientB = new User();
                clientB.setEmail("clientb@pizzum.com");
                clientB.setPassword(passwordEncoder.encode("1234!"));
                clientB.setRole(Role.clientRole);
                clientB.setName("Cliente");
                clientB.setSurname("Dos");
                userRepository.save(clientB);
                System.out.println("Usuarios creados.");
            }

            // Recuperamos las instancias frescas
            adminUser = userRepository.findByRole(Role.adminRole).stream().findFirst().orElseThrow();
            clientA = userRepository.findByEmail("clienta@pizzum.com").orElseThrow();
            clientB = userRepository.findByEmail("clientb@pizzum.com").orElseThrow();

            // =====================================================
            // 2. INICIALIZACIÓN DEL CATÁLOGO (CON PRECIOS ACTUALIZADOS)
            // =====================================================

            // --- PANES (Small / Medium / Large) ---
            if (breadRepository.count() == 0) {
                breadRepository.saveAll(List.of(
                        Bread.builder().name("Pan Brioche").priceSmall(50.0).priceMedium(60.0).priceLarge(70.0).isAvailable(true).build(),
                        Bread.builder().name("Pan de Papa").priceSmall(40.0).priceMedium(50.0).priceLarge(60.0).isAvailable(true).build(),
                        Bread.builder().name("Pan Integral").priceSmall(30.0).priceMedium(40.0).priceLarge(50.0).isAvailable(true).build(),
                        Bread.builder().name("Pan Sin Gluten").priceSmall(60.0).priceMedium(70.0).priceLarge(80.0).isAvailable(true).build()
                ));
            }

            // --- CARNES ---
            if (meatRepository.count() == 0) {
                meatRepository.saveAll(List.of(
                        Meat.builder().name("Carne de Res").priceSmall(150.0).priceMedium(200.0).priceLarge(250.0).isAvailable(true).build(),
                        Meat.builder().name("Pollo Crispy").priceSmall(130.0).priceMedium(180.0).priceLarge(230.0).isAvailable(true).build(),
                        Meat.builder().name("Lentejas").priceSmall(120.0).priceMedium(160.0).priceLarge(200.0).isAvailable(true).build()
                ));
            }

            // --- QUESOS (Pizza) ---
            if (cheeseRepository.count() == 0) {
                cheeseRepository.saveAll(List.of(
                        Cheese.builder().name("Cheddar").priceSmall(30.0).priceMedium(40.0).priceLarge(50.0).isAvailable(true).build(),
                        Cheese.builder().name("Dambo").priceSmall(30.0).priceMedium(40.0).priceLarge(50.0).isAvailable(true).build(),
                        Cheese.builder().name("Roquefort").priceSmall(45.0).priceMedium(55.0).priceLarge(65.0).isAvailable(true).build(),
                        Cheese.builder().name("Provolone").priceSmall(40.0).priceMedium(50.0).priceLarge(60.0).isAvailable(true).build()
                ));
            }

            // --- PIZZA OPTIONS ---
            if (doughRepository.count() == 0) {
                doughRepository.saveAll(List.of(
                        Dough.builder().name("Masa Clásica").priceSmall(100.0).priceMedium(120.0).priceLarge(150.0).isAvailable(true).build(),
                        Dough.builder().name("Masa Fina").priceSmall(90.0).priceMedium(110.0).priceLarge(140.0).isAvailable(true).build()
                ));
            }
            if (sauceRepository.count() == 0) {
                sauceRepository.saveAll(List.of(
                        Sauce.builder().name("Salsa Tomate").priceSmall(50.0).priceMedium(60.0).priceLarge(70.0).isAvailable(true).build(),
                        Sauce.builder().name("Salsa Pesto").priceSmall(70.0).priceMedium(80.0).priceLarge(90.0).isAvailable(true).build()
                ));
            }

            // --- TOPPINGS (Con isAvailable y 3 precios) ---
            if (toppingRepository.count() == 0) {
                toppingRepository.saveAll(List.of(
                        Topping.builder().name("Panceta").priceSmall(50.0).priceMedium(60.0).priceLarge(70.0).isAvailable(true).build(),
                        Topping.builder().name("Rúcula").priceSmall(20.0).priceMedium(25.0).priceLarge(30.0).isAvailable(true).build(),
                        Topping.builder().name("Pepperoni").priceSmall(45.0).priceMedium(55.0).priceLarge(65.0).isAvailable(true).build(),
                        Topping.builder().name("Champiñones").priceSmall(35.0).priceMedium(45.0).priceLarge(55.0).isAvailable(true).build(),
                        Topping.builder().name("Cebolla Caramelizada").priceSmall(30.0).priceMedium(40.0).priceLarge(50.0).isAvailable(true).build(),
                        Topping.builder().name("Huevo").priceSmall(25.0).priceMedium(30.0).priceLarge(35.0).isAvailable(true).build(),
                        Topping.builder().name("Olivas Negras").priceSmall(15.0).priceMedium(20.0).priceLarge(25.0).isAvailable(true).build(),
                        Topping.builder().name("Anchoas").priceSmall(60.0).priceMedium(70.0).priceLarge(80.0).isAvailable(true).build(),
                        Topping.builder().name("Albahaca").priceSmall(15.0).priceMedium(20.0).priceLarge(25.0).isAvailable(true).build()
                ));
            }

            // --- SIDES & BEVERAGES (Estos suelen mantener precio único, NO los cambié) ---
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
            // 3. RECUPERACIÓN SEGURA PARA PRUEBAS
            // =====================================================

            // Bread
            Bread bBrioche = breadRepository.findByName("Pan Brioche").orElseGet(() ->
                    breadRepository.save(Bread.builder().name("Pan Brioche").priceSmall(50.0).priceMedium(60.0).priceLarge(70.0).isAvailable(true).build()));

            // Meat
            Meat mRes = meatRepository.findByName("Carne de Res").orElseGet(() ->
                    meatRepository.save(Meat.builder().name("Carne de Res").priceSmall(150.0).priceMedium(200.0).priceLarge(250.0).isAvailable(true).build()));

            // Cheese
            Cheese cCheddar = cheeseRepository.findByName("Cheddar").orElseGet(() ->
                    cheeseRepository.save(Cheese.builder().name("Cheddar").priceSmall(30.0).priceMedium(40.0).priceLarge(50.0).isAvailable(true).build()));

            // Dough
            Dough dClasica = doughRepository.findByName("Masa Clásica").orElseGet(() ->
                    doughRepository.save(Dough.builder().name("Masa Clásica").priceSmall(100.0).priceMedium(120.0).priceLarge(150.0).isAvailable(true).build()));

            // Sauce
            Sauce sTomate = sauceRepository.findByName("Salsa Tomate").orElseGet(() ->
                    sauceRepository.save(Sauce.builder().name("Salsa Tomate").priceSmall(50.0).priceMedium(60.0).priceLarge(70.0).isAvailable(true).build()));

            // Topping
            Topping tPanceta = toppingRepository.findByName("Panceta").orElseGet(() ->
                    toppingRepository.save(Topping.builder().name("Panceta").priceSmall(50.0).priceMedium(60.0).priceLarge(70.0).isAvailable(true).build()));

            // Sides & Beverage (Precio único)
            Side sPapas = sideRepository.findByName("Papas Fritas Clásicas").orElseGet(() ->
                    sideRepository.save(Side.builder().name("Papas Fritas Clásicas").price(100.0).isAvailable(true).build()));

            Beverage bCoca = beverageRepository.findByName("Coca Cola 500ml").orElseGet(() ->
                    beverageRepository.save(Beverage.builder().name("Coca Cola 500ml").price(80.0).isAvailable(true).build()));

            // =====================================================
            // 4. INFO DEL CLIENTE (DIRECCIÓN Y PAGO)
            // =====================================================

            User finalClientA = clientA;

            Address addrHome = addressRepository.findAll().stream()
                    .filter(a -> a.getUser().getUserId().equals(finalClientA.getUserId()))
                    .findFirst()
                    .orElse(null);

            if (addrHome == null) {
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

            PaymentMethod pmCard = paymentMethodRepository.findAll().stream()
                    .filter(pm -> pm.getUser().getUserId().equals(finalClientA.getUserId()))
                    .findFirst()
                    .orElse(null);

            if (pmCard == null) {
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
                // Como actualizamos Burger.java, el .calculateSubtotal() ahora usará los precios
                // Small/Medium/Large que acabamos de cargar en la DB.
                bFavoritaA = Burger.builder()
                        .name("Burger Clásica Favorita")
                        .user(clientA)
                        .meatQuantity(1)
                        .bread(bBrioche)
                        .meat(mRes)
                        .toppings(Set.of(tPanceta))
                        .isAvailable(true)
                        .build();
                // Importante: calculateSubtotal() usa los getters actualizados de la entidad
                bFavoritaA.setSubtotal(bFavoritaA.getUnitPrice());
                bFavoritaA = creationRepository.save(bFavoritaA);

                FavoriteCreation favA = FavoriteCreation.builder()
                        .user(clientA)
                        .creation(bFavoritaA)
                        .build();
                favoriteCreationRepository.save(favA);

                Pizza p = Pizza.builder()
                        .name("Pizza Demo")
                        .user(clientA)
                        .size("25cm") // Large
                        .dough(dClasica)
                        .cheese(cCheddar)
                        .sauce(sTomate)
                        .toppings(new HashSet<>())
                        .isAvailable(true)
                        .build();
                p.setSubtotal(p.getUnitPrice());
                creationRepository.save(p);
            } else {
                bFavoritaA = (Burger) creationRepository.findAll().stream()
                        .filter(c -> c instanceof Burger).findFirst().orElse(null);
            }

            // =====================================================
            // 6. ÓRDENES DE PRUEBA
            // =====================================================
            if (orderRepository.count() == 0) {
                String clientEmail = clientA.getEmail();

                // ORDEN 1
                Order order1 = Order.builder()
                        .client(clientA)
                        .address(addrHome)
                        .paymentMethod(pmCard)
                        .state(OrderStatus.PENDING)
                        .date(LocalDateTime.now().minusDays(2))
                        .total(0.0)
                        .itemsCreation(new HashSet<>())
                        .itemsBeverage(new HashSet<>())
                        .itemsSide(new HashSet<>())
                        .build();

                order1 = orderRepository.save(order1);

                if (bFavoritaA != null) {
                    orderService.addCreationToOrder(order1.getId(), bFavoritaA.getCreationId(), 2, clientEmail, false);
                }
                orderService.addBeverageToOrder(order1.getId(), bCoca.getBeverageId(), 1, clientEmail, false);
                orderService.addSideToOrder(order1.getId(), sPapas.getSideId(), 1, clientEmail, false);

                order1 = orderRepository.findById(order1.getId()).orElseThrow();
                order1.setState(OrderStatus.DELIVERED);
                orderRepository.save(order1);


                // ORDEN 2
                Order order2 = Order.builder()
                        .client(clientA)
                        .address(addrHome)
                        .paymentMethod(pmCard)
                        .state(OrderStatus.PENDING)
                        .date(LocalDateTime.now())
                        .total(0.0)
                        .itemsCreation(new HashSet<>())
                        .itemsBeverage(new HashSet<>())
                        .itemsSide(new HashSet<>())
                        .build();

                order2 = orderRepository.save(order2);

                if (bFavoritaA != null) {
                    orderService.addCreationToOrder(order2.getId(), bFavoritaA.getCreationId(), 1, clientEmail, false);
                }
                orderService.addBeverageToOrder(order2.getId(), bCoca.getBeverageId(), 1, clientEmail, false);
            }

            System.out.println("¡INICIALIZACIÓN FINALIZADA! Backend listo.");
        };
    }
}