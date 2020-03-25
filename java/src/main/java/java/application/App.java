package java.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.application.entities.Color;
import java.application.repositories.ColorRepository;
import java.io.File;
import java.io.FileReader;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class App {
//    public String getGreeting() {
//        return "Hello world.";
//    }

    public static void main(String[] args) {
//        System.out.println(new App().getGreeting());
        SpringApplication.run(App.class, args);
    }

    @Bean
    CommandLineRunner initColors(ColorRepository colorRepository, BCryptPasswordEncoder passwordEncoder){
        return args -> {

            List<Color> colorList = (List<Color>) colorRepository.findAll();

            if (colorList.size() == 0) {

                ObjectMapper mapper = new ObjectMapper();
                File file = new File("./src/main/resources/colors.json");
                FileReader reader = new FileReader(file);
                Scanner scanner = new Scanner(reader);

                StringBuilder stringBuilder = new StringBuilder();

                while (scanner.hasNextLine()) {
                    stringBuilder.append(scanner.next());
                }

                // 1. convert JSON array to Array objects
                Color [] pp1 = mapper.readValue(stringBuilder.toString(), Color[].class);

                // 2. convert JSON array to List of objects
                List<Color> ppl2 = Arrays.asList(mapper.readValue(stringBuilder.toString(), Color[].class));

                colorRepository.saveAll(ppl2);
            }
        };
    }
}
