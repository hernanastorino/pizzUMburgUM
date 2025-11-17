package um.edu.uy.item;

import um.edu.uy.product.beverage.relations.BeverageInOrder;
import um.edu.uy.product.creation.relations.CreationInOrder;
import um.edu.uy.product.side.relations.SideInOrder;

public record ItemResponse(
        String itemName,
        Integer quantity,
        Double subtotal
) {
    public ItemResponse(CreationInOrder cio) {
        this(
                cio.getCreation().getName(),
                cio.getCreationQuantity(),
                cio.getCreationSubtotal()
        );
    }

    public ItemResponse(BeverageInOrder bio) {
        this(
                bio.getBeverage().getName(),
                bio.getBeverageQuantity(),
                bio.getBeverageSubtotal()
        );
    }

    public ItemResponse(SideInOrder sio) {
        this(
                sio.getSide().getName(),
                sio.getSideQuantity(),
                sio.getSideSubtotal()
        );
    }
}