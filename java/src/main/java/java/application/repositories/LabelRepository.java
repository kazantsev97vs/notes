package java.application.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.application.entities.Label;

@Repository
public interface LabelRepository extends CrudRepository<Label, Integer> {

}