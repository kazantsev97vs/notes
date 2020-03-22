package java.application.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
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
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    NoteService noteService;

    /** CRUD: ---------------------------------------------------------------------------------------------------- */

    @GetMapping("/{id}")
    public ApiResponse<User> getUserById(@PathVariable("id") User user){
        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "User fetched successfully.",
                user
        );
    }

    @PostMapping("/username")
    public ApiResponse<User> getUserByUsername(@RequestBody String username){
        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "User fetched successfully.",
                userService.findByUsername(username)
        );
    }

    @PostMapping
    public ApiResponse<User> saveUser(@RequestBody User user){
        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "User saved successfully.",
                userService.save(user)
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<User> updateUser(@PathVariable("id") User user, @RequestBody User updatedUserVersion) {

        if (user == null) return new ApiResponse<>(
                HttpStatus.OK.value(),
                "NOT FOUND",
                null
        );

        userService.update(updatedUserVersion);

        String message = "User updated successfully.";
        return new ApiResponse<>(
                HttpStatus.OK.value(),
                message,
                user
        );

    }

    @DeleteMapping("/{id}")
    public ApiResponse<User> deleteUser(@PathVariable("id") User user) {

        User deletedUser = userService.delete(user);

        String message = "User deleted successfully.";
        return new ApiResponse<>(
                HttpStatus.OK.value(),
                message,
                deletedUser
        );
    }

    /** NOTES: ---------------------------------------------------------------------------------------------------- */

    @PostMapping("/{id}/note")
    public ApiResponse<Map<String, Object>> saveNote(@PathVariable("id") User user, @RequestBody Note note) {
        Note dbNote = null;
        List<Label> labelList = note.getLabelList();

        // Если при создании заметки пользователь дал ей ярлык
        if (labelList.size() > 0) {
            note.setLabelList(null);
            dbNote = noteService.save(note, user);
            dbNote.setLabelList(labelList);
            dbNote = noteService.update(dbNote);
        } else {
            dbNote = noteService.save(note, user);
        }

        Map<String, Object> map = new HashMap<>();
        map.put("note", dbNote);
        map.put("colors", user.getColorList());

        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "saved",
                map
        );
    }

    @DeleteMapping("/{id}/note")
    public ApiResponse<Map<String, Object>> deleteNote(@PathVariable("id") User user, @RequestBody Note note) {
        Map<String, Object> map = new HashMap<>();
        map.put("note", noteService.delete(note, user));
        map.put("colors", user.getColorList());

        return new ApiResponse<>(
                HttpStatus.OK.value(),
                "deleted",
                map
        );
    }

    /** LABELS: --------------------------------------------------------------------------------------------------- */

    @PostMapping("/{id}/label")
    public ApiResponse<Label> addLabel(@PathVariable("id") User user, @RequestBody Label label) {

        return new ApiResponse<>(
                200,
                "saved",
                userService.addLabelToUserLabelList(user, label)
        );
    }

    @DeleteMapping("/{id}/label")
    public ApiResponse<Label> removeLabel(@PathVariable("id") User user, @RequestBody Label label) {

        return new ApiResponse<>(
                200,
                "deleted",
                userService.deleteLabelFromUserLabelList(user, label)
        );
    }

    @PutMapping("/{id}/label")
    public ApiResponse<Label> updateLabel(@PathVariable("id") User user, @RequestBody Label label) {

        return new ApiResponse<>(
                200,
                "deleted",
                userService.updateLabelToUserLabelList(user, label)
        );
    }
}
