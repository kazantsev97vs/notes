package java.application.service;

import java.application.entities.Color;
import java.application.entities.Label;
import java.application.entities.Note;
import java.application.entities.User;
import java.util.List;

/**
 * Сервис для работы с заметками
 */
public interface NoteService {

    /* CRUD: ----------------------------------------------- */

    /**
     * Найти заметку
     * @param note - искомая заметка
     * @return заметка из БД
     */
    Note find(Note note);

    /**
     * Сохранить заметку в БД
     * @param note - сохраняемая заметка
     * @param user - пользователь, с которым нужно связать заметку
     * @return заметка из БД
     */
    Note save(Note note, User user);

    /**
     * Удалить заметку из БД
     * @param note - удаляемая заметка
     * @param user - пользователь, у которого нужно удалить заметку
     * @return заметка из БД
     */
    Note delete(Note note, User user);

    /**
     * Изменить заметку в БД
     * @param noteNewVersion - новая версия заметка
     * @return заметка из БД
     */
    Note update(Note noteNewVersion);

    /**
     * Изменить заметку в БД согласуя с цветами пользователя
     * @param noteNewVersion - новая версия заметка
     * @param user - пользователь
     * @return заметка из БД
     */
    Note updateNoteWithColorList(Note noteNewVersion, User user);


    /* NOTE-LABELS: ---------------------------------------- */
    /**
     * Добавить ярлык в список ярлыков заметки
     * @param note - текущая замтека
     * @param label - добавляемый ярлык
     * @return список ярлыков заметки
     */
    List<Label> addLabelToNoteLabelList(Note note, Label label);

    /**
     * Удалить ярлык из списка ярлыков заметки
     * @param note - текущая замтека
     * @param label - удаляемый ярлык
     * @return список ярлыков заметки
     */
    List<Label> deleteLabelFromNoteLabelList(Note note, Label label);

    /**
     * Найти все заметки
     * @param header
     * @return
     */
    List<Note> findAllByHeader(String header);

    List<Note> findAllByBackgroundColor(Color color);

    List<Note> findAllByLabelList(Label label);

}
