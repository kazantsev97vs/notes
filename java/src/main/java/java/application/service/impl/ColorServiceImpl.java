package java.application.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.application.entities.Color;
import java.application.repositories.ColorRepository;
import java.application.service.ColorService;
import java.util.List;
import java.util.Optional;

/**
 * Реализация Сервиса для работы с цветами
 */
@Service(value = "colorService")
public class ColorServiceImpl implements ColorService {

    @Autowired
    ColorRepository colorRepository;

    /**
     * Получить все цвета
     * @return список доступных цветов из БД
     */
    @Override
    public List<Color> findAll() {
        return (List<Color>) colorRepository.findAll();
    }

    /**
     * Получить цвет по его имени
     * @param name уникальное имя цвета
     * @return цвет из БД
     */
    @Override
    public Color findByName(String name) {
        return colorRepository.findByName(name);
    }

    /**
     * Сохранить цвет в БД
     * @param color - сохраняемый цвет
     * @return цвет из БД
     */
    @Override
    public Color save(Color color) {
        return colorRepository.save(color);
    }

    /**
     * Удалить цвет из БД
     * @param color - удаляемый цвет
     * @return цвет из БД
     */
    @Override
    public Color delete(Color color) {
        colorRepository.delete(color);
        return color;
    }

    /**
     * Изменнить цвет в БД
     * @param color - новая версия цвета
     * @return цвет из БД
     */
    @Override
    public Color update(Color color) {

        if (color.getId() == null) return null;

        Optional<Color> optionalLabel = colorRepository.findById(color.getId());

        if (optionalLabel.orElse(null) == null) return null;

        return colorRepository.save(color);
    }

}
