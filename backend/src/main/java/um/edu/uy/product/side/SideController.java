package um.edu.uy.product.side;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sides")
@RequiredArgsConstructor
public class SideController {

    private final SideService sideService;

    @GetMapping
    public List<SideResponse> getAllSides() {
        return sideService.findAllSides().stream().map(SideResponse::new).toList();
    }

    @GetMapping("/{id}")
    public SideResponse getSideById(@PathVariable Long id) {
        return new SideResponse(sideService.getSideById(id));
    }

    @PostMapping
    public SideResponse createSide(@RequestBody Side side) {
        Side savedSide = sideService.saveSide(side);
        return new SideResponse(savedSide);
    }

    @PutMapping("/{id}")
    public SideResponse updateSide(@PathVariable Long id, @RequestBody Side side) {
        Side existingSide = sideService.getSideById(id);

        existingSide.setName(side.getName());
        existingSide.setPrice(side.getPrice());

        Side updatedSide = sideService.saveSide(existingSide);
        return new SideResponse(updatedSide);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSide(@PathVariable Long id) {
        sideService.deleteSideById(id);
        return ResponseEntity.noContent().build();
    }
}