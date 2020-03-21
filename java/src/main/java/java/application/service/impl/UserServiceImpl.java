package java.application.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.application.entities.Color;
import java.application.entities.Label;
import java.application.entities.User;
import java.application.repositories.UserRepository;
import java.application.service.LabelService;
import java.application.service.UserService;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * Реализация Сервиса для работы с полльзователями
 */
@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	LabelService labelService;

	@Autowired
	private BCryptPasswordEncoder bcryptEncoder;

	// CRUD:

	/**
	 * Сохранить в БД объект пользователя,
	 * предварительно захэшировать пароль пользователя
	 * @param user - объект пользователя
	 * @return объект пользователя из БД
	 */
	@Override
	public User save(User user) {

		String password = user.getPassword();
		String encodedPassword = bcryptEncoder.encode(password);

		user.setPassword(encodedPassword);

		return userRepository.save(user);
	}

	/**
	 * Достать пользователя из БД
	 * @param username - ник искомого пользователя
	 * @return пользователя из БД
	 */
	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	/**
	 * Обновить данные пользователя, исключая его идентификатор и пароль
	 * @param updatedUserVersion - изменённая версия пользователя
	 * @return объект пользователя из БД
	 */
	@Override
	public User update(User updatedUserVersion) {

		Optional<User> optionalUser = userRepository.findById(updatedUserVersion.getId());
		User user = optionalUser.orElse(null);

		if (user == null) return null;

		BeanUtils.copyProperties(updatedUserVersion, user, "id", "password");

		return userRepository.save(user);
	}

	/**
	 * Удалить пользователя из БД
	 * @return объект пользователя до удаления из БД
	 */
	@Override
	public User delete(User user) {

		userRepository.delete(user);

		return user;
	}

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepository.findByUsername(username);

		if (user == null) throw new UsernameNotFoundException("Invalid username or password.");

		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority());
	}
	private List<SimpleGrantedAuthority> getAuthority() {
		return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
	}


	// LABELS:

	/**
	 * Добавить ярлык в список ярлыков пользователя
	 * @param user - текущий пользователь
	 * @param label - добавляемый ярлык
	 * @return список ярлыков пользователя
	 */
	@Override
	public Label addLabelToUserLabelList(User user, Label label) {

		Label dbLabel = labelService.save(label);

		List<Label> labelList = user.getLabelList();
		labelList.add(dbLabel);

		update(user);

		return dbLabel;
	}

	/**
	 * Удалить ярлык из списка ярлыков пользователя
	 * @param user - текущий пользователь
	 * @param label - удаляемый ярлык
	 * @return список ярлыков пользователя
	 */
	@Override
	public Label deleteLabelFromUserLabelList(User user, Label label) {

		user.getLabelList().remove(label);

		update(user);

		return labelService.delete(label);

	}

	/**
	 * Изменить имеющийся ярлык в списке ярлыков пользователя
	 * @param user - текущий пользователь
	 * @param label - новая версия ярлыка
	 * @return список ярлыков пользователя
	 */
	@Override
	public Label updateLabelToUserLabelList(User user, Label label) {
		return labelService.update(label);
	}


	/* COLORS: ---------------------------------------- */
	/**
	 * Добавить цвет в список цветов пользователя
	 * @param user - текущий пользователь
	 * @param color - добавляемый цвет
	 * @return список цветов пользователя
	 */
	@Override
	public Color addColorToUserColorList(User user, Color color) {

		List<Color> colorList = user.getColorList();
		colorList.add(color);

		update(user);

		return color;
	}

	/**
	 * Удалить цвет из списка цветов пользователя
	 * @param user - текущий пользователь
	 * @param color - удаляемый цвет
	 * @return список цветов пользователя
	 */
	@Override
	public Color deleteColorFromUserColorList(User user, Color color) {

		List<Color> colorList = user.getColorList();
		colorList.remove(color);

		update(user);

		return color;
	}

}
