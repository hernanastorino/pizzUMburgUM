package um.edu.uy.user.client.data.adress;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import um.edu.uy.user.User;
import um.edu.uy.user.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public List<Address> getActiveAddressesByUser(Long userId) {
        return addressRepository.findByUser_UserIdAndActiveTrue(userId);
    }

    public Address createAddressForUser(Long userId, Address newAddress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = Address.builder()
                .user(user)
                .active(true)
                .name(newAddress.getName())
                .street(newAddress.getStreet())
                .doorNumber(newAddress.getDoorNumber())
                .aptNumber(newAddress.getAptNumber())
                .indications(newAddress.getIndications())
                .build();

        return addressRepository.save(address);
    }

    public void softDelete(Long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        address.setActive(false);
        addressRepository.save(address);
    }

    public Address updateSmart(Long id, Address newInfo) {

        Address old = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        boolean coreChanges =
                !old.getStreet().equals(newInfo.getStreet()) ||
                        !old.getDoorNumber().equals(newInfo.getDoorNumber()) ||
                        !old.getAptNumber().equals(newInfo.getAptNumber()) ||
                        !old.getName().equals(newInfo.getName());

        if (coreChanges) {
            old.setActive(false);
            addressRepository.save(old);

            Address fresh = Address.builder()
                    .user(old.getUser())
                    .active(true)
                    .name(newInfo.getName())
                    .street(newInfo.getStreet())
                    .doorNumber(newInfo.getDoorNumber())
                    .aptNumber(newInfo.getAptNumber())
                    .indications(newInfo.getIndications())
                    .build();

            return addressRepository.save(fresh);
        }

        old.setIndications(newInfo.getIndications());
        return addressRepository.save(old);
    }
}
