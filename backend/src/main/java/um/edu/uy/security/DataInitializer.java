package um.edu.uy.security;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import um.edu.uy.product.beverage.Beverage;
import um.edu.uy.product.beverage.BeverageRepository;
import um.edu.uy.product.creation.burger.options.condiment.Condiment;
import um.edu.uy.product.creation.burger.options.condiment.CondimentRepository;
import um.edu.uy.product.creation.topping.Topping;
import um.edu.uy.product.creation.topping.ToppingRepository;
import um.edu.uy.product.creation.burger.options.bread.Bread;
import um.edu.uy.product.creation.burger.options.meat.Meat;
import um.edu.uy.product.creation.burger.options.bread.BreadRepository;
import um.edu.uy.product.creation.burger.options.meat.MeatRepository;
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

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            BreadRepository breadRepository,
            MeatRepository meatRepository,
            CondimentRepository condimentRepository,
            CheeseRepository cheeseRepository,
            SideRepository sideRepository,
            BeverageRepository beverageRepository,
            ToppingRepository toppingRepository,
            DoughRepository doughRepository,
            SauceRepository sauceRepository,
            AddressRepository addressRepository,
            PaymentMethodRepository paymentMethodRepository) {

        return args -> {
            // 1. Usuarios
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

            clientA = userRepository.findByEmail("clienta@pizzum.com").orElseThrow();

            // 2. Catalogo
            if (breadRepository.count() == 0) {
                breadRepository.saveAll(List.of(
                        Bread.builder().name("Pan Brioche").priceSmall(50.0).priceMedium(60.0).priceLarge(70.0).isAvailable(true).build(),
                        Bread.builder().name("Pan de Papa").priceSmall(40.0).priceMedium(50.0).priceLarge(60.0).isAvailable(true).build(),
                        Bread.builder().name("Pan Integral").priceSmall(30.0).priceMedium(40.0).priceLarge(50.0).isAvailable(true).build(),
                        Bread.builder().name("Pan Sin Gluten").priceSmall(60.0).priceMedium(70.0).priceLarge(80.0).isAvailable(true).build()
                ));
            }

            if (meatRepository.count() == 0) {
                meatRepository.saveAll(List.of(
                        Meat.builder().name("Carne de Res").priceSmall(150.0).priceMedium(200.0).priceLarge(250.0).isAvailable(true).build(),
                        Meat.builder().name("Pollo Crispy").priceSmall(130.0).priceMedium(180.0).priceLarge(230.0).isAvailable(true).build(),
                        Meat.builder().name("Lentejas").priceSmall(120.0).priceMedium(160.0).priceLarge(200.0).isAvailable(true).build()
                ));
            }

            if (condimentRepository.count() == 0) {
                condimentRepository.saveAll(List.of(
                        Condiment.builder().name("Ketchup").priceSmall(0.0).priceMedium(0.0).priceLarge(0.0).isAvailable(true).build(),
                        Condiment.builder().name("Mayonesa").priceSmall(0.0).priceMedium(0.0).priceLarge(0.0).isAvailable(true).build(),
                        Condiment.builder().name("Mostaza").priceSmall(0.0).priceMedium(0.0).priceLarge(0.0).isAvailable(true).build(),
                        Condiment.builder().name("Barbacoa").priceSmall(10.0).priceMedium(10.0).priceLarge(10.0).isAvailable(true).build(),
                        Condiment.builder().name("Cheddar Fundido").priceSmall(20.0).priceMedium(30.0).priceLarge(40.0).isAvailable(true).build()
                ));
            }

            if (cheeseRepository.count() == 0) {
                cheeseRepository.saveAll(List.of(
                        Cheese.builder().name("Cheddar").priceSmall(30.0).priceMedium(40.0).priceLarge(50.0).isAvailable(true).build(),
                        Cheese.builder().name("Dambo").priceSmall(30.0).priceMedium(40.0).priceLarge(50.0).isAvailable(true).build(),
                        Cheese.builder().name("Roquefort").priceSmall(45.0).priceMedium(55.0).priceLarge(65.0).isAvailable(true).build(),
                        Cheese.builder().name("Provolone").priceSmall(40.0).priceMedium(50.0).priceLarge(60.0).isAvailable(true).build()
                ));
            }

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

            // 3. Datos de cliente
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
                addressRepository.save(newAddr);
            }

            PaymentMethod pmCard = paymentMethodRepository.findAll().stream()
                    .filter(pm -> pm.getUser().getUserId().equals(finalClientA.getUserId()))
                    .findFirst()
                    .orElse(null);

            if (pmCard == null) {
                PaymentMethod newPm = PaymentMethod.builder()
                        .user(clientA)
                        .cardName("Tarjeta Trabajo")
                        .cardNumber("4527 7829 7699 5315")
                        .cvv("676")
                        .ownerName("Nombre en Tarjeta")
                        .build();
                paymentMethodRepository.save(newPm);
            }

            System.out.println("Backend Listo");
        };
    }
}