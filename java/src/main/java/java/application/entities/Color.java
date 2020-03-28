package java.application.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import javax.persistence.*;

/**
 * Сущеность цвета
 */

@Entity
@Table(name = "color")
@Data
@NoArgsConstructor
public class Color {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    @Column(unique = true)
    private String name;

    @NonNull
    private String color;

}