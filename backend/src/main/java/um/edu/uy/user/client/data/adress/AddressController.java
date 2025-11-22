package um.edu.uy.user.client.data.adress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired private AddressRepository addressRepository;
    @Autowired private UserRepository userRepository;

    // obtener direcciones de un usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Address>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(addressRepository.findByUser_UserId(userId));
    }

    // crear nueva dir
    @PostMapping("/user/{userId}")
    public ResponseEntity<Address> create(@PathVariable Long userId, @RequestBody Address address) {
        User user = userRepository.findById(userId).orElseThrow();
        address.setUser(user);
        return ResponseEntity.ok(addressRepository.save(address));
    }

    // editar dir existente
    @PutMapping("/{id}")
    public ResponseEntity<Address> update(@PathVariable Long id, @RequestBody Address newAd) {
        return addressRepository.findById(id).map(addr -> {
            addr.setName(newAd.getName());
            addr.setStreet(newAd.getStreet());
            addr.setDoorNumber(newAd.getDoorNumber());
            addr.setAptNumber(newAd.getAptNumber());
            addr.setIndications(newAd.getIndications());
            return ResponseEntity.ok(addressRepository.save(addr));
        }).orElse(ResponseEntity.notFound().build());
    }

    // borrar dir
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        addressRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}