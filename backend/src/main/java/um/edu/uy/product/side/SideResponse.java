package um.edu.uy.product.side;

public record SideResponse(
        Long id,
        String name,
        Double price
) {
    public SideResponse (Side side) {
        this(
                side.getSideId(),
                side.getName(),
                side.getPrice()
        );
    }
}