package um.edu.uy.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MenuController {

    @GetMapping("/menu")
    public String getMenu(){
        return "This is the menu page";
    }
}
