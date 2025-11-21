package um.edu.uy.security;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import um.edu.uy.product.beverage.Beverage;
import um.edu.uy.product.beverage.BeverageRepository;
import um.edu.uy.product.creation.burger.repo.MeatRepository;
import um.edu.uy.product.creation.pizza.options.Cheese;
import um.edu.uy.product.creation.pizza.repo.CheeseRepository;
import um.edu.uy.product.side.Side;
import um.edu.uy.product.side.SideRepository;
import um.edu.uy.user.Role;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;

import um.edu.uy.product.creation.burger.options.Bread;
import um.edu.uy.product.creation.burger.options.Meat;


import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            um.edu.uy.repository.BreadRepository breadRepository,
            MeatRepository meatRepository,
            CheeseRepository cheeseRepository,
            SideRepository sideRepository,
            BeverageRepository beverageRepository) {

        return args -> {
            // -----------------------------------------------------
            // 1. INICIALIZACIÓN DE USUARIOS
            // -----------------------------------------------------
            if (userRepository.findByRole(Role.adminRole).isEmpty()) {
                System.out.println("No admin user found. Creating initial admin...");

                User adminUser = new User();
                adminUser.setEmail("admin@pizzum.com");
                adminUser.setPassword(passwordEncoder.encode("1234!"));
                adminUser.setRole(Role.adminRole);

                User clientUser = new User();
                clientUser.setEmail("client@pizzum.com");
                clientUser.setPassword(passwordEncoder.encode("1234!"));
                clientUser.setRole(Role.clientRole);

                userRepository.save(adminUser);
                userRepository.save(clientUser);
                System.out.println("Users created (Admin & Client).");
            }

            // -----------------------------------------------------
            // 2. INICIALIZACIÓN DE PANES (Breads)
            // -----------------------------------------------------
            if (breadRepository.count() == 0) {
                System.out.println("Cargando catálogo de Panes...");
                breadRepository.saveAll(List.of(
                        Bread.builder().name("Pan Brioche").price(50.0).isAvailable(true).build(),
                        Bread.builder().name("Pan de Papa").price(40.0).isAvailable(true).build(),
                        Bread.builder().name("Pan Integral").price(30.0).isAvailable(true).build(),
                        Bread.builder().name("Pan Sin Gluten").price(60.0).isAvailable(true).build()
                ));
            }

            // -----------------------------------------------------
            // 3. INICIALIZACIÓN DE CARNES (Meats)
            // -----------------------------------------------------
            if (meatRepository.count() == 0) {
                System.out.println("Cargando catálogo de Carnes...");
                meatRepository.saveAll(List.of(
                        Meat.builder().name("Carne de Res 180g").price(150.0).isAvailable(true).build(),
                        Meat.builder().name("Pollo Crispy").price(130.0).isAvailable(true).build(),
                        Meat.builder().name("Hamburguesa de Lentejas").price(120.0).isAvailable(true).build() // Opción Veggie
                ));
            }

            // -----------------------------------------------------
            // 4. INICIALIZACIÓN DE QUESOS (Cheeses)
            // -----------------------------------------------------
            if (cheeseRepository.count() == 0) {
                System.out.println("Cargando catálogo de Quesos...");
                cheeseRepository.saveAll(List.of(
                        Cheese.builder().name("Cheddar").price(30.0).isAvailable(true).build(),
                        Cheese.builder().name("Dambo").price(30.0).isAvailable(true).build(),
                        Cheese.builder().name("Roquefort").price(45.0).isAvailable(true).build(),
                        Cheese.builder().name("Provolone").price(40.0).isAvailable(true).build()
                ));
            }

            // -----------------------------------------------------
            // 5. INICIALIZACIÓN DE ACOMPAÑAMIENTOS (Sides)
            // -----------------------------------------------------
            if (sideRepository.count() == 0) {
                System.out.println("Cargando catálogo de Acompañamientos...");
                sideRepository.saveAll(List.of(
                        Side.builder().name("Papas Fritas Clásicas").price(100.0).isAvailable(true).build(),
                        Side.builder().name("Aros de Cebolla").price(120.0).isAvailable(true).build(),
                        Side.builder().name("Boniato Frito").price(110.0).isAvailable(true).build()
                ));
            }

            // -----------------------------------------------------
            // 6. INICIALIZACIÓN DE BEBIDAS (Beverages)
            // -----------------------------------------------------
            if (beverageRepository.count() == 0) {
                System.out.println("Cargando catálogo de Bebidas...");
                beverageRepository.saveAll(List.of(
                        Beverage.builder().name("Coca Cola 500ml").price(80.0).isAvailable(true).build(),
                        Beverage.builder().name("Agua Sin Gas").price(60.0).isAvailable(true).build(),
                        Beverage.builder().name("Cerveza Artesanal").price(150.0).isAvailable(true).build()
                ));
            }

            System.out.println("Inicialización de datos completada exitosamente.");
        };
    }
}