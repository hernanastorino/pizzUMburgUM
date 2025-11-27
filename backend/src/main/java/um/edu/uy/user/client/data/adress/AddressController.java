package um.edu.uy.user.client.data.adress;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Address>> getAddressByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(addressService.getActiveAddressesByUser(userId));
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Address> createAddress(
            @PathVariable Long userId,
            @RequestBody Address newAddress
    ) {
        Address created = addressService.createAddressForUser(userId, newAddress);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address newInfo) {
        Address updated = addressService.updateSmart(id, newInfo);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddressById(@PathVariable Long id) {
        addressService.softDelete(id);
        return ResponseEntity.ok().build();
    }
}