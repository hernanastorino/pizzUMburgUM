package um.edu.uy.user.client.data.adress;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import um.edu.uy.user.User;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUser(User user);

    List<Address> findByUser_UserIdAndIsActive(Long userId);
}