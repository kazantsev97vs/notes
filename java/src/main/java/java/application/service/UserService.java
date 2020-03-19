package java.application.service;

import java.application.entities.Color;
import java.application.entities.Label;
import java.application.entities.User;

/**
 * Сервис для работы с полльзователями
 */
public interface UserService {

	/* CRUD: ---------------------------------------- */

	/**
	 * Сохранить в БД объект пользователя,
	 * предварительно захэшировать пароль пользователя
	 * @param user - объект пользователя
	 * @return объект пользователя из БД
     */
    User save(User user);

	/**
	 * Достать пользователя из БД
	 * @param username - ник искомого пользователя
	 * @return пользователя из БД
	 */
	User findByUsername(String username);

    /**
	 * Обновить данные пользователя, исключая его идентификатор и пароль
	 * @param updatedUserVersion - изменённая версия пользователя
	 * @return объект пользователя из БД
	 */
    User update(User updatedUserVersion);

    /**
	 * Удалить пользователя из БД
	 * @param user - объект пользователя
	 * @return объект пользователя до удаления из БД
	 */
    User delete(User user);


	/* LABELS: ---------------------------------------- */

	/**
	 * Добавить ярлык в список ярлыков пользователя
	 * @param user - текущий пользователь
	 * @param label - добавляемый ярлык
	 * @return список ярлыков пользователя
	 */
	Label addLabelToUserLabelList(User user, Label label);

	/**
	 * Удалить ярлык из списка ярлыков пользователя
	 * @param user - текущий пользователь
	 * @param label - удаляемый ярлык
	 * @return список ярлыков пользователя
	 */
	Label deleteLabelFromUserLabelList(User user, Label label);

	/**
	 * Изменить имеющийся ярлык в списке ярлыков пользователя
	 * @param user - текущий пользователь
	 * @param label - новая версия ярлыка
	 * @return список ярлыков пользователя
	 */
	Label updateLabelToUserLabelList(User user, Label label);


	/* COLORS: ---------------------------------------- */
	/**
	 * Добавить цвет в список цветов пользователя
	 * @param user - текущий пользователь
	 * @param color - добавляемый цвет
	 * @return список цветов пользователя
	 */
	Color addColorToUserColorList(User user, Color color);

	/**
	 * Удалить цвет из списка цветов пользователя
	 * @param user - текущий пользователь
	 * @param color - удаляемый цвет
	 * @return список цветов пользователя
	 */
	Color deleteColorFromUserColorList(User user, Color color);

}