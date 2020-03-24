package java.application.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.application.entities.Color;
import java.application.entities.Label;
import java.application.entities.Note;
import java.application.entities.User;
import java.application.models.ApiResponse;
import java.application.service.NoteService;
import java.application.service.UserService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    NoteService noteService;

    @Autowired
    UserService userService;

    @PutMapping("/{id}")
    public ApiResponse<Map<String, Object>> updateNote(@PathVariable("id") User user, @RequestBody Note noteNewVersion) {

        Note note = noteService.updateNoteWithColorList(noteNewVersion, user);
        Map<String, Object> map = new HashMap<>();
        map.put("note", note);
        map.put("colors", user.getColorList());

        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "updated",
                map
        );
    }

    /* NOTE-LABELS: ---------------------------------------- */

    @PostMapping("/{id}")
    public ApiResponse<List<Label>> addLabelToNoteLabelList(@PathVariable("id") Note note, @RequestBody Label label) {

         return new ApiResponse<>(
                 HttpStatus.OK.value(),
                 "added",
                 noteService.addLabelToNoteLabelList(note, label)
         );
     }

    @DeleteMapping("/{id}")
    public ApiResponse<List<Label>> deleteLabelFromNoteLabelList(@PathVariable("id") Note note, @RequestBody Label label) {

         return new ApiResponse<>(
                 HttpStatus.OK.value(),
                 "deleted",
                 noteService.deleteLabelFromNoteLabelList(note, label)
         );
     }


    @PostMapping("/headers")
    public ApiResponse<List<Note>> findAllByHeader(@RequestBody String header) {

        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "OK",
                noteService.findAllByHeader(header)
        );
    }

    @PostMapping("/colors")
    public ApiResponse<List<Note>> findAllByBackgroundColor(@RequestBody Color color) {
        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "OK",
                noteService.findAllByBackgroundColor(color)
        );
    }
    @PostMapping("/labels")
    public ApiResponse<List<Note>> findAllByLabelList(@RequestBody Label label) {
        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "OK",
                noteService.findAllByLabelList(label)
        );
    }
}
