package um.edu.uy.product.beverage;

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