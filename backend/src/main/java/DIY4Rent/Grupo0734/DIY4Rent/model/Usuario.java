package DIY4Rent.Grupo0734.DIY4Rent.model;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name="usuarios")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String dni;
    private String nombre;
    private String direccion;
    private String email;
    private String telefono;
}
