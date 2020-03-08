package java.application.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "note")
@Data
@NoArgsConstructor
public class Note {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    private String header;

    private String body;

    private Date creationDate;

    private Date lastModifiedDate;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Label> labelList;

    @OneToOne
    @NonNull
    private Color backgroundColor;

    @OneToOne
    @NonNull
    private Color color;

}