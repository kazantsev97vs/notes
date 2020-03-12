package java.application.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.application.entities.Color;

@Repository
public interface ColorRepository extends CrudRepository<Color, Integer> {

    Color findByName(String name);

}