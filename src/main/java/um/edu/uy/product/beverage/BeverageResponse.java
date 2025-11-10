package um.edu.uy.product.beverage;

import java.util.Locale;

public record BeverageResponse(
        Long id,
        String name,
        Double price
) {
    public BeverageResponse (Beverage beverage) {
        this(
                beverage.getBeverageId(),
                beverage.getName(),
                beverage.getPrice()
        );
    }
}
