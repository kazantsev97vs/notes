package java.application.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.application.entities.Color;
import java.application.entities.Label;
import java.application.entities.Note;
import java.util.List;

@Repository
public interface NoteRepository extends CrudRepository<Note, Integer> {

    List<Note> findAllByHeader(String header);

    List<Note> findAllByBackgroundColor(Color color);

    List<Note> findAllByLabelList(Label label);

}