package um.edu.uy.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Permite CORS para todas las rutas de tu API
                .allowedOrigins("http://localhost:3000") // Permite peticiones SÓLO desde tu app de React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

        registry.addMapping("/v3/api-docs/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET");
    }
}
