package java.application.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.application.entities.Label;
import java.application.repositories.LabelRepository;
import java.application.service.LabelService;
import java.util.Optional;

/**
 * Реализация Сервиса для работы с ярлыками
 */
@Service(value = "labelService")
public class LabelServiceImpl implements LabelService {

    @Autowired
    LabelRepository labelRepository;

    /**
     * Достать ярлык из БД
     * @param label - искомый ярлык
     * @return ярлык из БД
     */
    @Override
    public Label find(Label label) {

        if (label.getId() == null) return null;

        Optional<Label> optionalLabel = labelRepository.findById(label.getId());

        return optionalLabel.orElse(null);
    }

    /**
     * Сохранить ярлык в БД
     * @param label - сохраняемый ярлык
     * @return ярлык из БД
     */
    @Override
    public Label save(Label label) {
        return labelRepository.save(label);
    }

    /**
     * Удалить ярлык из БД
     * @param label - удаляемый ярлык
     * @return ярлык из БД
     */
    @Override
    public Label delete(Label label) {

        labelRepository.delete(label);

        return label;
    }

    /**
     * Изменнить ярлык в БД
     * @param label - новая версия ярлыка
     * @return ярлык из БД
     */
    @Override
    public Label update(Label label) {

        Label dbLabel = find(label);

        if (dbLabel == null) return null;

        return labelRepository.save(label);
    }



//    /**
//     * Найти все ярлыки для текущего пользователя по его id
//     * @param userId - идентификатор пользователя
//     * @return список ярлыков
//     */
//    @Override
//    public List<Label> findAllByUserId(Integer userId) {
//        return labelRepository.findAllByUserId(userId);
//    }
//
//    /**
//     * Добавить ярлык в список ярлыков текущего пользователя
//     * @param userId - идентификатор пользователя
//     * @param label - добавляемый ярлык
//     * @return обновленный список ярлыков
//     */
//    @Override
//    public List<Label> addLabel(Integer userId, Label label) {
//
//        List<Label> labelList = findAllByUserId(userId);
//
//        labelList.add(label);
//
//
//        label.setUser(userService.findById(userId));
//
//        labelRepository.save(label);
//
//        return labelList;
//    }
//
//    /**
//     * Удалить ярлык из списка ярлыков текущего пользователя
//     * @param userId - идентификатор пользователя
//     * @param label - удаляемый ярлык
//     * @return обновленный список ярлыков
//     */
//    @Override
//    public List<Label> deleteLabel(Integer userId, Label label) {
//
//        List<Label> labelList = findAllByUserId(userId);
//
//        labelList.remove(label);
//
//        return labelList;
//    }
//
//    /**
//     * Обновить ярлык из списка ярлыков текущего пользователя
//     * @param userId - идентификатор пользователя
//     * @param label - новая версия ярлыка
//     * @return обновленный список ярлыков
//     */
//    @Override
//    public List<Label> updateLabel(Integer userId, Label label) {
//
//        List<Label> labelList = findAllByUserId(userId);
//
//        for (int index = 0; index < labelList.size(); index++) {
//
//            Label labelItem = labelList.get(index);
//
//            // Если id ярлыков совпадают
//            if (labelItem.getId().equals(label.getId())) {
//                labelList.set(index, label);
//            }
//        }
//
//        return labelList;
//    }
}
