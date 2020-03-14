package java.application.service;

import java.application.entities.Label;

/**
 * Сервис для работы с ярлыками
 */
public interface LabelService {

    /**
     * Достать ярлык из БД
     * @param label - искомый ярлык
     * @return ярлык из БД
     */
    Label find(Label label);

    /**
     * Сохранить ярлык в БД
     * @param label - сохраняемый ярлык
     * @return ярлык из БД
     */
    Label save(Label label);

    /**
     * Удалить ярлык из БД
     * @param label - удаляемый ярлык
     * @return ярлык из БД
     */
    Label delete(Label label);

    /**
     * Изменнить ярлык в БД
     * @param label - новая версия ярлыка
     * @return ярлык из БД
     */
    Label update(Label label);

}
