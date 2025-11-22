package um.edu.uy;

import jakarta.persistence.Entity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "um.edu.uy")
public class PizzUmBurgUmApplication {

	public static void main(String[] args) {
		SpringApplication.run(PizzUmBurgUmApplication.class, args);
	}

}
