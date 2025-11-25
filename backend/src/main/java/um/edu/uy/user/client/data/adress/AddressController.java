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

    // 1. GET (Solo activas)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Address>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(addressRepository.findByUser_UserIdAndActiveTrue(userId));
    }

    // 2. DELETE (Soft Delete - Borrado Lógico)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));

        address.setActive(false); // La apagamos
        addressRepository.save(address); // Guardamos el cambio

        return ResponseEntity.ok().build();
    }

    // 3. PUT (Smart Update con Soft Delete)
    @PutMapping("/{id}")
    public ResponseEntity<Address> updateSmart(@PathVariable Long id, @RequestBody Address newInfo) {
        Address oldAddress = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));

        // Definir qué es un cambio drástico
        boolean coreChanges = !oldAddress.getStreet().equals(newInfo.getStreet()) ||
                !oldAddress.getDoorNumber().equals(newInfo.getDoorNumber());

        if (coreChanges) {
            // A. CAMBIO GRANDE:
            // 1. Apagamos la vieja (Soft Delete)
            oldAddress.setActive(false);
            addressRepository.save(oldAddress);

            // 2. Creamos la nueva (Active = true por defecto)
            Address brandNewAddress = Address.builder()
                    .user(oldAddress.getUser())
                    .active(true) // Explícito por las dudas
                    .name(newInfo.getName())
                    .street(newInfo.getStreet())
                    .doorNumber(newInfo.getDoorNumber())
                    .aptNumber(newInfo.getAptNumber())
                    .indications(newInfo.getIndications())
                    .build();

            return ResponseEntity.ok(addressRepository.save(brandNewAddress));

        } else {
            // B. CAMBIO CHICO (Solo editar)
            oldAddress.setIndications(newInfo.getIndications());
            // oldAddress.setName(newInfo.getName()); // Si querés permitir cambiar el alias
            return ResponseEntity.ok(addressRepository.save(oldAddress));
        }
    }
}