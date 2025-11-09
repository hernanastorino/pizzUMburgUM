package um.edu.uy;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PublicController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/index")
    public String index() {
        return "home";
    }

    @GetMapping("/sesion")
    public String sesion() {
        return "sesion";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/menu")
    public String menu() {
        return "menu";
    }

    @GetMapping("/testpage")
    public String testPage() {
        return "test";
    }


    @PostMapping("/login")
    public String processLogin() {

        return "redirect:/menu";
    }


    @GetMapping("/login")
    public String login() {
        return "sesion";
    }

    @GetMapping("/masa-pizza")
    public String masaPizza() {
        return "masa-pizza";
    }




}