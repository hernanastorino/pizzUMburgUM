package um.edu.uy;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PublicController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/index")
    public String index() {
        return "index";
    }

    @GetMapping("/sesion")
    public String sesion() {
        return "sesion";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/testpage")
    public String testPage() {
        return "test";
    }


}