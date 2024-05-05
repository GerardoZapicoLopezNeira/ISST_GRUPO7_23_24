package DIY4Rent.Grupo0734.DIY4Rent.model;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Builder
@Data
@Table(name="usuario")
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username", nullable = false, unique = true)
    private String username;
    
    @Column(name = "password", nullable = false)
    private String password;
    
    @Column(name = "dni", nullable = false, unique = true)
    private String dni;
    
    @Column(name = "nombre", nullable = false)
    private String nombre;
    
    @Column(name = "direccion", nullable = false)
    private String direccion;
    
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Column(name = "telefono", nullable = false)
    private String telefono;

    @Column(name="latitude")
    private Float lat;

    @Column(name="longitude")
    private Float lng;

    
    @OneToMany(fetch = FetchType.LAZY, mappedBy="usuario", cascade = CascadeType.ALL)
    private List<Herramienta> herramienta;

    @OneToMany(fetch = FetchType.LAZY, mappedBy="usuario", cascade = CascadeType.ALL)
    private List<Reserva> reserva;
}
