package java.application.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.application.entities.Color;
import java.application.models.ApiResponse;
import java.application.service.ColorService;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/colors")
public class ColorController {

    @Autowired
    private ColorService colorService;

    @GetMapping
    public ApiResponse<List<Color>> getAllColors () {

        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "all colors are founded",
                colorService.findAll()
        );
    }

    @GetMapping("/{colorName}")
    public ApiResponse<Color> getColor (@PathVariable("colorName") Color color) {

        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "color is founded",
                color
        );
    }
}