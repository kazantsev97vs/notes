package java.application.service;

import java.application.entities.Color;
import java.util.List;

/**
 * Сервис для работы с цветами
 */
public interface ColorService {

    /**
     * Получить все цвета
     * @return список доступных цветов из БД
     */
    List<Color> findAll();

    /**
     * Получить цвет по его имени
     * @param name уникальное имя цвета
     * @return цвет из БД
     */
    Color findByName(String name);

    /**
     * Сохранить цвет в БД
     * @param color - сохраняемый цвет
     * @return цвет из БД
     */
    Color save(Color color);

    /**
     * Удалить цвет из БД
     * @param color - удаляемый цвет
     * @return цвет из БД
     */
    Color delete(Color color);

    /**
     * Изменнить цвет в БД
     * @param color - новая версия цвета
     * @return цвет из БД
     */
    Color update(Color color);

}
