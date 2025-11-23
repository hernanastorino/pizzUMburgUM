package um.edu.uy.user.client.data.adress;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateSmart(@PathVariable Long id, @RequestBody Address newInfo) {

        Address oldAddress = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));

        // Definimos qué es "Importante" (Core Fields)
        boolean coreChanges = !oldAddress.getStreet().equals(newInfo.getStreet()) ||
                !oldAddress.getDoorNumber().equals(newInfo.getDoorNumber()) ||
                !oldAddress.getAptNumber().equals(newInfo.getAptNumber()) ||
                !oldAddress.getName().equals(newInfo.getName()); // Ej: "Casa" vs "Trabajo"

        if (coreChanges) {
            // OPCIÓN A: CAMBIO IMPORTANTE -> CREAR NUEVA (Preservar Historial)
            // Creamos una entidad nueva de cero vinculada al mismo usuario
            Address brandNewAddress = Address.builder()
                    .user(oldAddress.getUser()) // Mismo dueño
                    .name(newInfo.getName())
                    .street(newInfo.getStreet())
                    .doorNumber(newInfo.getDoorNumber())
                    .aptNumber(newInfo.getAptNumber())
                    .indications(newInfo.getIndications()) // Copiamos indicaciones nuevas
                    .build();

            // Guardamos la nueva. La vieja queda "huérfana" de uso futuro pero vinculada a órdenes viejas.
            return ResponseEntity.ok(addressRepository.save(brandNewAddress));

        } else {
            // OPCIÓN B: CAMBIO MENOR (Indicaciones) -> EDITAR EXISTENTE
            // Si solo cambió "Tocar timbre fuerte", actualizamos la misma
            oldAddress.setIndications(newInfo.getIndications());
            return ResponseEntity.ok(addressRepository.save(oldAddress));
        }
    }
}
