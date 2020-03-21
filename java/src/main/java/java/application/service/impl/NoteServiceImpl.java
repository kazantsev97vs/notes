package java.application.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.application.entities.Color;
import java.application.entities.Label;
import java.application.entities.Note;
import java.application.entities.User;
import java.application.repositories.NoteRepository;
import java.application.service.NoteService;
import java.application.service.UserService;
import java.util.List;
import java.util.Optional;

/**
 * Реализация Сервиса для работы с заметками
 */
@Service(value = "noteService")
public class NoteServiceImpl implements NoteService {

    @Autowired
    NoteRepository noteRepository;

    @Autowired
    UserService userService;

    /**
     * Найти заметку
     * @param note - искомая заметка
     * @return заметка из БД
     */
    @Override
    public Note find(Note note) {
        Optional<Note> optionalNote = noteRepository.findById(note.getId());
        return optionalNote.orElse(null);
    }

    /**
     * Сохранить заметку в БД
     * @param note - сохраняемая заметка
     * @param user - пользователь, с которым нужно связать заметку
     * @return заметка из БД
     */
    @Override
    public Note save(Note note, User user) {

        Note dbNote = noteRepository.save(note);

        List<Color> colorList = user.getColorList();

        Color color = dbNote.getBackgroundColor();

        if (!colorList.contains(color)) {
            user.getColorList().add(color);
        }

        user.getNoteList().add(dbNote);

        userService.update(user);

        return dbNote;
    }

    Boolean shouldDeleteColorFromUserColorList(Integer colorId, List<Note> noteList) {

        // Флаг, следует удалять цвет из списка цветов пользователя или нет
        boolean isDeleteColorFromUserColorList = true;

        // Перебираем заметки пользователя
        for (Note noteItem : noteList) {
            // Если хотя бы одна заметка имеет фоновый цвет равный фону удаляемой заметки
            if (noteItem.getBackgroundColor().getId().equals(colorId)) {
                // То цвет из массива цветов пользователя удалять не нужно
                isDeleteColorFromUserColorList = false;
                // Прекратить обход листа
                break;
            }
        }

        return isDeleteColorFromUserColorList;
    }

    /**
     * Удалить заметку из БД
     * @param note - удаляемая заметка
     * @param user - пользователь, у которого нужно удалить заметку
     * @return заметка из БД
     */
    @Override
    public Note delete(Note note, User user) {

        List<Note> noteList = user.getNoteList();
        noteList.remove(note);

        if (this.shouldDeleteColorFromUserColorList(note.getBackgroundColor().getId(), noteList)) {
            user.getColorList().remove(note.getBackgroundColor());
        }

        userService.update(user);

        noteRepository.delete(note);

        return note;
    }

    /**
     * Изменить заметку в БД
     * @param noteNewVersion - новая версия заметка
     * @return заметка из БД
     */
    @Override
    public Note update(Note noteNewVersion) {

        Note dbNote = find(noteNewVersion);

        BeanUtils.copyProperties(noteNewVersion, dbNote, "id", "creationDate");

        return noteRepository.save(dbNote);
    }

    /**
     * Изменить заметку в БД согласуя с цветами пользователя
     * @param noteNewVersion - новая версия заметка
     * @param user - пользователь
     * @return заметка из БД
     */
    @Override
    public Note updateNoteWithColorList(Note noteNewVersion, User user) {

        Note dbNote = find(noteNewVersion);
        if (dbNote == null) return null;

        Color newColor = noteNewVersion.getBackgroundColor();
        Color oldColor = dbNote.getBackgroundColor();
        List<Color> colorList = user.getColorList();
        List<Note> noteList = user.getNoteList();
        noteList.remove(dbNote);

        // Цвет фона заметки изменился
        if (!newColor.equals(oldColor)) {

            // старый цвет в дригих заметках не встречается
            if (shouldDeleteColorFromUserColorList(oldColor.getId(), noteList)) {
                // удаляем его
                user.getColorList().remove(oldColor);
            }

            // Нового фона заметки еще нет в цветах пользователя
            if (!colorList.contains(newColor)) {
                // добавить новый цвет
                colorList.add(newColor);
            }
        }

        BeanUtils.copyProperties(noteNewVersion, dbNote, "id", "creationDate");
        noteList.add(dbNote);

        userService.update(user);

        return noteRepository.save(dbNote);
    }

    /**
     * Добавить ярлык в список ярлыков заметки
     * @param note - текущая замтека
     * @param label - добавляемый ярлык
     * @return список ярлыков заметки
     */
    @Override
    public List<Label> addLabelToNoteLabelList(Note note, Label label) {

        List<Label> noteLabelList = note.getLabelList();
        noteLabelList.add(label);

        update(note);

        return note.getLabelList();
    }

    /**
     * Удалить ярлык из списка ярлыков заметки
     * @param note - текущая замтека
     * @param label - удаляемый ярлык
     * @return список ярлыков заметки
     */
    @Override
    public List<Label> deleteLabelFromNoteLabelList(Note note, Label label) {
        List<Label> noteLabelList = note.getLabelList();
        noteLabelList.remove(label);

        update(note);

        return note.getLabelList();
    }

    /**
     * Найти все заметки
     * @param header
     * @return
     */
    public List<Note> findAllByHeader(String header) {

        return noteRepository.findAllByHeader(header);

    }

    public List<Note> findAllByBackgroundColor(Color color) {
        return noteRepository.findAllByBackgroundColor(color);
    }

    public List<Note> findAllByLabelList(Label label) {
        return noteRepository.findAllByLabelList(label);
    }

}
