package java.application.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private String firstName;

    private String lastName;

    @NonNull
    @Column(unique = true)
    private String username;

    @NonNull
    private String password;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> noteList;

}