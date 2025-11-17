package um.edu.uy.product.side;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SideService {

    private final SideRepository sideRepository;

    public Side getSideById(Long id) {
        return sideRepository.findById(id).orElseThrow(() -> new RuntimeException("Side not found: " + id));
    }

    public List<Side> findAllSides() {
        return sideRepository.findAll();
    }

    public Side saveSide(Side side) {
        return sideRepository.save(side);
    }

    public void deleteSideById(Long id) {
        if (!sideRepository.existsById(id)) {
            throw new RuntimeException("Side not found: " + id);
        }
        sideRepository.deleteById(id);
    }
}