package DIY4Rent.Grupo0734.DIY4Rent.model;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Builder
@Data
@Table(name="usuarios")
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // @Column(name = "username", nullable = false, unique = true)
    private String username;
    // @Column(name = "password", nullable = false)
    private String password;
    // @Column(name = "dni", nullable = false, unique = true)
    private String dni;
    // @Column(name = "nombre", nullable = false)
    private String nombre;
    // @Column(name = "direccion", nullable = false)
    private String direccion;
    // @Column(name = "email", nullable = false, unique = true)
    private String email;
    // @Column(name = "telefono", nullable = false)
    private String telefono;
}
